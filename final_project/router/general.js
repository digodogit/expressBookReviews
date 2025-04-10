const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios').default;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  
  const register = users.find(({username,password})=>
  req.body.username===username && req.body.password===password
)
console.log(users)
if (!register){
    users.push({'username': req.body.username, 'password':req.body.password})
    return res.status(200).json({message: "user registered"});
}
  
  return res.status(300).json({message: "error"});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //The function use axios to get the books using the router "books_routes" implemented on booksdb.js
    try{
  const result = await axios.get("http://localhost:5000/books")
  res.send(result.data)
    }catch (err){
  return res.status(400).json({message: err});
}
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //The function use axios to get the book by ISBN using the router "books_routes" implemented on booksdb.js
  try{
    const result = await axios.get(`http://localhost:5000/books/isbn/${req.params.isbn}`)
    res.send(result.data)
      }catch (err){
    return res.status(400).json({message: err});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //The function use axios to get the book by author using the router "books_routes" implemented on booksdb.js
  try{

    const result = await axios.get(`http://localhost:5000/books/author/${req.params.author.replace(/\s/g, '').toLowerCase()}`)
    res.send(result.data)
      }catch (err){
    return res.status(400).json({message: err});
  }
 });

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //The function use axios to get the book by title using the router "books_routes" implemented on booksdb.js
  try{
    const result = await axios.get(`http://localhost:5000/books/title/${req.params.title.replace(/\s/g, '').toLowerCase()}`)
    res.send(result.data)
      }catch (err){
    return res.status(400).json({message: err});
  }
 });

//  Get book review
public_users.get('/review/:isbn',async function (req, res) {
  //Write your code here
  try{
    const result = await axios.get(`http://localhost:5000/books/review/${req.params.isbn}`)
    return res.send(result.data)
      }catch (err){
    return res.status(400).json({message: err});
  }
 });

module.exports.general = public_users;
