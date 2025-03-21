import React, { useState, useEffect } from "react";
import axios from "axios";
import "./enroll.css";
import { Enroll, GetLibrary } from "../api/api_functions";

function EnrollLib() {
  const [lib, setLib] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const libraryData = await GetLibrary();
        setLib(libraryData.data);
      } catch (error) {
        setResult("Login In First")
        console.error("Error fetching libraries:", error.message);
      }
    };

    fetchLibrary();
  }, []);

  const handleEnrollClick = async (libraryId) => {
    try {
      const res = await Enroll(libraryId);
      console.log(res)
     setResult(res);
    } catch (error) {
     // console.error("Error enrolling in library:", error.message);
      //setResult(error.message.response.data.error);
      
    }
  };

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div className="log">
      <div className="login-containerr">
        <h2 className="form-title">Enroll in Library</h2>
        <div className="library-list">
          <h3>Available Libraries</h3>
          <div className="ul_cont">
          {lib.length > 0 ? (
            <ul>
              {lib.map((library, index) => (
                <li key={index}>
                  {library.Name} - ID: {library.ID}
                  <button
                    onClick={() => handleEnrollClick(library.ID)}
                    className="login-button"
                  >
                    Enroll
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No libraries available.</p>
          )}
          {result && <p className="result-message">{result}</p>}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default EnrollLib;