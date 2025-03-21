import React, { useState, useEffect } from "react";
import axios from "axios";
import "./searchBook.css";

function Request_approve_decline() {
    const [query, setQuery] = useState('');
    const [ans, setAns] = useState('');
    const [requests, setrequests] = useState([]);
    const token = localStorage.getItem('token');
    const fetchrequests = async () => {
        try {
            const response = await axios.get('http://localhost:8081/auth/request/all', {
                params: { type: query },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.data.data === "No request found") {
                setrequests([]);
                
            } else {
                console.log(response.data.data)
                setrequests(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(fetchrequests, 300); // Debounce the search by 300ms

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleApproveClick = async (ID) => {
        try {
            const res= await axios.post(`http://localhost:8081/auth/request/approve`, {
                "ID": ID
            },{
                headers:{'Authorization': `Bearer ${token}`,}
            });
            setAns(res.data.data)
            console.log(res.data.data)
            fetchrequests(); // Fetch requests again after enrolling
        } catch (error) {
            setAns(error.response.data.error);
            console.log(error.response.data.error)
        }
    };
    const handleDeclineClick = async (ID) => {
        try {
            const res= await axios.patch(`http://localhost:8081/auth/request/decline`, {
                "ID": ID
            },{
                headers:{'Authorization': `Bearer ${token}`,}
            });
            setAns(res.data.data)
            console.log(res.data.data)
            fetchrequests(); // Fetch requests again after enrolling
        } catch (error) {
            setAns(error.response.data.error);
            console.log(error.response.data.error)
        }
    };

    return (
        <div className="ser_cont">
            <div className="search-page">
                <h1>See Request</h1>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a book by title"
                />
                <h3>{ans}</h3>
                <ul>
                    {requests.map((reqs, index) => (
                        <li key={index}>
                            <h3>ID: {reqs.ID} &nbsp; LibId : {reqs.LibID}</h3>
                            <strong>ReaderId : {reqs.ReaderID}</strong><br></br>
                            <strong>{reqs.RequestType}</strong>
                            {(reqs.RequestType=="approved")&&<p>Approved By :{reqs.ApproverID}</p>}
                            <h4>Total: {reqs.ApproverID} &nbsp; &nbsp; Available: {reqs.BookID}</h4>
                            <div style={{display:"flex" ,gap:"4px"}}>
                            <button
                                onClick={() => handleApproveClick(reqs.ID)}
                                className="login-button"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleDeclineClick(reqs.ID)}
                                className="login-button"
                            >
                                Decline
                            </button>
                            </div>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Request_approve_decline;