const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

public_users.get('/',function (req, res) {
  // Reemplaza la línea del mensaje con esto:
  return res.status(200).send(JSON.stringify(books, null, 4));
});

public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).send(books[isbn]);
});
  
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filtered_books = Object.values(books).filter((book) => book.author === author);
  return res.status(200).send(JSON.stringify(filtered_books, null, 4));
});

public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filtered_books = Object.values(books).filter((book) => book.title === title);
  return res.status(200).send(JSON.stringify(filtered_books, null, 4));
});

public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).send(books[isbn].reviews);
});

module.exports.general = public_users;
