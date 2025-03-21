import React, { useState, useEffect } from "react";
import axios from "axios";
import "./searchBook.css";

function SearchBooks() {
    const [query, setQuery] = useState('');
    const [ans, setAns] = useState('');
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem('token');
    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8081/books/title', {
                params: { title: query }
            });
            if (response.data.data === "No books found") {
                setBooks([]);
                
            } else {
                // console.log(response.data.data)
                setBooks(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(fetchBooks, 300); // Debounce the search by 300ms

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleEnrollClick = async (ISBN,LibID) => {
        try {
            const res= await axios.post(`http://localhost:8081/auth/request/raise`, {
                "BookId": ISBN,
                "LibId":LibID
            },{
                headers:{'Authorization': `Bearer ${token}`,}
            });
            setAns(res.data.data)
            fetchBooks(); // Fetch books again after enrolling
        } catch (error) {
            setAns(error.response.data.error);
        }
    };

    return (
        <div className="ser_cont">
            <div className="search-page">
                <h1>Book Search</h1>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a book by title"
                />
                <h3>{ans}</h3>
                <ul>
                    {books.map((book, index) => (
                        <li key={index}>
                            <h3>ISBN: {book.ISBN} &nbsp; LibId :{book.LibID}</h3>
                            <strong>{book.Title}</strong> by {book.Authors}
                            <h4>Total: {book.TotalCopies} &nbsp; &nbsp; Available: {book.AvailableCopies}</h4>
                            <button
                                onClick={() => handleEnrollClick(book.ISBN,book.LibID)}
                                className="login-button"
                            >
                                Request
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchBooks;