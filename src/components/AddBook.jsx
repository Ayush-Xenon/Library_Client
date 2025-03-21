import React, { useState, useEffect } from "react";
import axios from 'axios';
import { IsValidISBN, ValidateName } from "../validators/validator";

function AddBook() {
  const [f, setF] = useState({
    isbn: "",
    title: "",
    author: "",
    version: "",
    publisher: "",
    totalcopies: "",
    availblecopies: "",
  });

  const token = localStorage.getItem('token');
  const [ans, setAns] = useState("");
  const [errors, setErrors] = useState({ chk: "" });

  const handleChange = (e) => {
    setF({
      ...f,
      [e.target.name]: e.target.value,
    });
  };

  const validates = (val) => {
    let temperr = {};
    if (!IsValidISBN(val.isbn)) {
      temperr.isbn = "Invalid ISBN";
    }
    var res = ValidateName(val.title);
    if (!res.val) {
      temperr.title = res.msg;
    }
    res = ValidateName(val.author);
    if (!res.val) {
      temperr.author = res.msg;
    }
    res = ValidateName(val.publisher);
    if (!res.val) {
      temperr.publisher = res.msg;
    }
    return temperr;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const temperr = validates(f);
    setErrors(temperr);
  };

  const finishSubmit = async () => {
    try {
      var url = "http://localhost:8081/auth/book/create";
      const res = await axios.post(url, {
        "ISBN": f.isbn,
        "Title": f.title,
        "Authors": f.author,
        "Publisher": f.publisher,
        "Version": f.version,
        "TotalCopies": parseInt(f.totalcopies, 10),
        "AvailableCopies": parseInt(f.totalcopies, 10)
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setAns("Book Added Successfully");
    } catch (err) {
      setAns(err.response.data.error);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <div className="log">
      <div className="login-container">
        <h2 className="form-title">Book Details</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder={"Enter ISBN"}
              className="input-field"
              onChange={handleChange}
              required
              name="isbn"
            />
            <i className="material-symbols-rounded">{<img src={"dfd"} />}</i>
            {errors.isbn ? (
              <p className="error">
                {errors.isbn}
              </p>
            ) : null}
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder={"Enter Title"}
              className="input-field"
              onChange={handleChange}
              required
              name="title"
            />
            <i className="material-symbols-rounded">{<img src={"dfd"} />}</i>
            {errors.title ? (
              <p className="error">
                {errors.title}
              </p>
            ) : null}
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder={"Enter Author"}
              className="input-field"
              onChange={handleChange}
              name="author"
              required
            />
            <i className="material-symbols-rounded">{<img src={"rgfr"} />}</i>
            {errors.author ? (
              <p className="error">
                {errors.author}
              </p>
            ) : null}
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder={"Enter Publisher"}
              className="input-field"
              onChange={handleChange}
              name="publisher"
              required
            />
            <i className="material-symbols-rounded">{<img src={"rgfr"} />}</i>
            {errors.publisher ? (
              <p className="error">
                {errors.publisher}
              </p>
            ) : null}
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder={"Enter Version"}
              className="input-field"
              onChange={handleChange}
              name="version"
              required
            />
            <i className="material-symbols-rounded">{<img src={"rgfr"} />}</i>
          </div>

          <div className="input-wrapper">
            <input
              type="number"
              placeholder={"Enter Number of Copies"}
              className="input-field"
              onChange={handleChange}
              name="totalcopies"
              required
            />
            <i className="material-symbols-rounded">{<img src={"rgfr"} />}</i>
          </div>

          <h4>{ans}</h4>
          <button type="submit" className="login-button">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;