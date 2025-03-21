import React, { useState, useEffect } from "react";
import axios from "axios";
import "./searchBook.css";

function AssignAdmin() {
    const [query, setQuery] = useState('');
    const [ans, setAns] = useState('');
    const [usr, setUsr] = useState([]);
    const token = localStorage.getItem('token');
    const fetchUsr = async () => {
        try {
            const response = await axios.get('http://localhost:8081/auth/user', {
                params: { id: query },
                headers:{'Authorization': `Bearer ${token}`}
          });
            if (response.data.data === "No User found") {
                setUsr([]);
                setAns(response.data.data)
            } else {
                // console.log(response.data.data)
                setUsr(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(fetchUsr, 300); // Debounce the search by 300ms
        setAns("")
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleEnrollClick = async (ID) => {
        try {
            const res= await axios.patch(`http://localhost:8081/auth/library/assign_admin`, {
                "ID": ID
            },{
                headers:{'Authorization': `Bearer ${token}`,}
            });
            console.log(res.data)
            setAns(res.data.data)
            fetchUsr(); // Fetch books again after enrolling
        } catch (error) {
          console.log(error)
            setAns(error.response.data.error);
        }
    };

    return (
        <div className="ser_cont">
            <div className="search-page">
                <h1>Assign Admin</h1>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a book by title"
                />
                <h3>{ans}</h3>
                <ul>
                    {usr.map((user, index) => (
                        <li key={index}>
                            <h3>ID : {user.ID}</h3>
                            <strong>Name : {user.Name}</strong>
                            <h4>Email : {user.Email}</h4>
                            <button
                                onClick={() => handleEnrollClick(user.ID)}
                                className="login-button"
                            >
                                Assign
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AssignAdmin;