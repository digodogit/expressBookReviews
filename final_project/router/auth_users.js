const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js").books;
const axios = require('axios').default;
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (loginUsername,loginPassword)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
const result = users.filter(({username, password})=> username===loginUsername && password===loginPassword)
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
    accessToken, user
}
return res.status(200).send("User successfully logged in");
}   
return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
    try{
        const bookByISBN = Object.getOwnPropertyDescriptor(books, req.params.isbn).value;
        if(bookByISBN){
            bookByISBN.reviews[req.session.authorization.user.username] = req.query.review

            return res.status(200).json({message:"Review successfully posted",book: bookByISBN});
        }
    }catch (err){
        console.log(err)
        }
    return res.status(400).json({message: "erro"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    try{
        const bookByISBN = Object.getOwnPropertyDescriptor(books, req.params.isbn).value;
        if(bookByISBN){
            delete bookByISBN.reviews[req.session.authorization.user.username]

            return res.status(200).json({message:"Review successfully deleted",book: bookByISBN});
        }
    }catch (err){
        console.log(err)
        }
    return res.status(400).json({message: "erro"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
