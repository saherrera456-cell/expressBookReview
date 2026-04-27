const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Tarea 7: Registrar nuevo usuario
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Login successful!"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Tarea 2: Obtener todos los libros
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Tarea 3: Obtener libro por ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).send(books[isbn]);
});
  
// Tarea 4: Obtener libro por autor
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filtered_books = Object.values(books).filter((book) => book.author === author);
  return res.status(200).send(JSON.stringify(filtered_books, null, 4));
});

// Tarea 5: Obtener libro por título
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filtered_books = Object.values(books).filter((book) => book.title === title);
  return res.status(200).send(JSON.stringify(filtered_books, null, 4));
});

// Tarea 6: Obtener la reseña de un libro
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).send(books[isbn].reviews);
});

module.exports.general = public_users;
