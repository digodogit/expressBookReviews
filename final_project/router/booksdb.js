const express = require('express');
const books_routes = express.Router();



let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {'digodoletterboxd': 'achei o filme meio cringe'} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

books_routes.get("/", async (req, res) => {
    try{
    const books_json = JSON.stringify(books,null,4)
    return res.send(books_json)
    } catch(err){
        return res.status(404).json({message: err});
}
})

books_routes.get("/isbn/:isbn", async (req, res) => {
    try{
    const books_json = JSON.stringify(Object.getOwnPropertyDescriptor(books, req.params.isbn).value);
    return res.send(books_json)
    } catch(err){

        return res.status(404).json({message: err});
}
})

books_routes.get("/author/:author", async (req, res) => {
    console.log(req.params.author)
    try{
        const books_json = JSON.stringify(Object.values(books)
        .find((search)=> search.author.replace(/\s/g, '').toLowerCase()===req.params.author)
        );
        return res.send(books_json)
        } catch (err){
            return res.status(404).json({message: err});
    }
})
books_routes.get("/title/:title", async (req, res) => {
    try{
    const books_json = JSON.stringify(Object.values(books)
    .find((search)=> search.title.replace(/\s/g, '').toLowerCase()===req.params.title)
    );
    return res.send(books_json)
    } catch(err){
        return res.status(404).json({message: err});
}
})
books_routes.get("/review/:isbn", async (req, res) => {
    console.log(req.params.isbn)
    try{
    const books_json = JSON.stringify(await Object.getOwnPropertyDescriptor(books, req.params.isbn)
    .value.reviews);
    console.log(books_json)
    return res.send(books_json)
    } catch (err){
        
    return res.status(404).json({message: err});
}
})

module.exports=books_routes;
module.exports.books=books;
