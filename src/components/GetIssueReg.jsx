import React, { useState, useEffect } from "react";
import axios from "axios";
import "./searchBook.css";


function GetIssueReg() {
    const [query, setQuery] = useState('');
    const [ans, setAns] = useState('');
    const [issueReg, setissueReg] = useState([]);
    const token = localStorage.getItem('token');
    const role=localStorage.getItem('role');
    const fetchissueReg = async () => {
        try {
            const response = await axios.get('http://localhost:8081/auth/issue/all', {
                params: { type: query },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.data.data === "No Issue Record Found") {
                setissueReg([]);
                
            } else {
                console.log(response.data.data)
                setissueReg(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching issueReg:', error);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(fetchissueReg, 300); // Debounce the search by 300ms

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleReturnClick = async (ID) => {
        try {
            const res= await axios.patch(`http://localhost:8081/auth/request/return`, {
                "ID": ID
            },{
                headers:{'Authorization': `Bearer ${token}`,}
            });
            setAns(res.data.data)
            console.log(res.data.data)
            fetchissueReg(); // Fetch issueReg again after enrolling
        } catch (error) {
            setAns(error.response.data.error);
            console.log(error.response.data.error)
        }
    };

    return (
        <div className="ser_cont">
            <div className="search-page">
                <h1>Issue Registry</h1>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a book by title"
                />
                <h3>{ans}</h3>
                <ul>
                    {issueReg.map((issReg, index) => (
                        <li key={index}>
                            <h3>ID: {issReg.ID} &nbsp; LibId : {issReg.LibId}</h3>
                            <strong>ReaderId : {issReg.ReaderID}</strong><br></br>
                            <strong>IssueDate : {issReg.CreatedAt?.substring(0, 10) || "N/A"}</strong>
                            {(issReg.IssueStatus==="returned")?<p>Approved By :{issReg.ReturnApproverID}<br/>
                            <strong>ReturnedDate : {issReg.ReturnDate?.substring(0, 10) || "N/A"}</strong>
                            </p>
                            :<p><strong>Expected RetunDate : {issReg.ExpectedReturnDate?.substring(0, 10) || "N/A"}</strong></p>
                            }
                            {(role==="admin")&&(issReg.IssueStatus==="lent")&&
                            <button
                                onClick={() => handleReturnClick(issReg.ID)}
                                className="login-button"
                            >
                                Return
                            </button> }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GetIssueReg;