$targetFile = "router/general.js"
$content = @'
const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (!isValid(username)) { 
      users.push({username, password});
      return res.status(200).json({message: "Customer successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

public_users.get("/", (req, res) => res.status(200).send(JSON.stringify(books, null, 4)));
public_users.get("/isbn/:isbn", (req, res) => res.status(200).send(books[req.params.isbn]));
public_users.get("/author/:author", (req, res) => {
  const author = req.params.author;
  let filtered = Object.values(books).filter(b => b.author === author);
  res.status(200).send(JSON.stringify(filtered, null, 4));
});
public_users.get("/title/:title", (req, res) => {
  const title = req.params.title;
  let filtered = Object.values(books).filter(b => b.title === title);
  res.status(200).send(JSON.stringify(filtered, null, 4));
});
public_users.get("/review/:isbn", (req, res) => res.status(200).send(books[req.params.isbn].reviews));

module.exports.general = public_users;
'@

[System.IO.File]::WriteAllText($targetFile, $content)
