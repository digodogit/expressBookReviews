const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  
  const register = users.find(({username,password})=>
  req.query.username===username && req.query.password===password
)
console.log(users)
if (!register){
    users.push({'username': req.query.username, 'password':req.query.password})
    return res.status(200).json({message: "user registered"});
}
  
  return res.status(300).json({message: "error"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4))
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const bookByISBN = JSON.stringify(Object.getOwnPropertyDescriptor(books, req.params.isbn).value);
  res.send(bookByISBN);
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const bookByAuthor = JSON.stringify(Object.values(books)
  .find((search)=> search.author===req.params.author)
  );
  res.send(bookByAuthor)
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const bookByTitle = JSON.stringify(Object.values(books)
  .find((search)=> search.title===req.params.title)
  );
  res.send(bookByTitle);
  return res.status(200).json({message: "Successful"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const bookByISBN = JSON.stringify(Object.getOwnPropertyDescriptor(books, req.params.isbn)
  .value.reviews);
  res.send(bookByISBN);
  return res.status(200).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
