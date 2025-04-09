const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
const result = users.filter(user => user.username===username && user.password===password)
return result.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here    
  const user = req.body.user;
    if (!user) {
        return res.status(404).json({ message: "Body Empty" });
    }
    if (authenticatedUser(user.username,user.password)){
    // Generate JWT access token
    let accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });
    // Store access token in session
    req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    }   
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const bookByISBN = Object.getOwnPropertyDescriptor(books, req.params.isbn).value.reviews;
  if(bookByISBN){
  bookByISBN[username]=req.query.review
  res.send(bookByISBN);
  return res.status(200).send("Review successfully posted");
}
  return res.status(404).json({message: "book not found"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const bookByISBN = Object.getOwnPropertyDescriptor(books, req.params.isbn).value.reviews;
    if(bookByISBN){
    delete bookByISBN[username]
    res.send(bookByISBN);
    return res.status(200).send("Review successfully posted");
  }
    return res.status(404).json({message: "book not found"});
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
