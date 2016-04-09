var express = require('express');
var router = express.Router();
const dt = require('../db/tables');

router.get('/', function(req, res, next) {
  const data = {};
  dt.Author()
    .then((authors) =>{
      data.authors = authors;
      const authorIDs = authors.map(x =>(
        x.author_id
      ));
      dt.Biblio()
        .whereIn('author_book_id', authorIDs)
        .pluck('book_author_id')
        .then(bookIDs =>{
          dt.Book()
            .whereIn('book_id', bookIDs)
            .then(books =>{
              data.books = books;
              res.render('authors',{
                Authors: data.authors,
                Books: data.books
              });
            });
        });
    });
});

router.get('/search/:id', function(req, res, next) {
  const data = {};
  const id = req.params.id;
  dt.Author()
    .where({'author_id': id})
    .first()
    .then((author) =>{
      data.author = author;
      dt.Biblio()
        .where({'author_book_id': id})
        .pluck('book_author_id')
        .then(bookIDs =>{
          dt.Book()
            .whereIn('book_id', bookIDs)
            .then(books =>{
              data.books = books;
              // res.json(data);
              res.render('author',{
                Author: data.author,
                Books: data.books
              });
            });
        });
    });
});

router.get('/data', function(req, res, next) {
  const data = {};
  dt.Author()
    .then((authors) =>{
      data.authors = authors;
      const authorIDs = authors.map(x =>(
        x.author_id
      ));
      dt.Biblio()
        .whereIn('author_book_id', authorIDs)
        .pluck('book_author_id')
        .then(bookIDs =>{
          dt.Book()
            .whereIn('book_id', bookIDs)
            .then(books =>{
              data.books = books;
              res.json(data);
            });
        });
    });
});

router.get('/data/:id', function(req, res, next) {
  const data = {};
  const id = req.params.id;
  dt.Author()
    .where({'author_id': id})
    .first()
    .then((author) =>{
      data.author = author;
      dt.Biblio()
        .where({'author_book_id': id})
        .pluck('book_author_id')
        .then(bookIDs =>{
          dt.Book()
            .whereIn('book_id', bookIDs)
            .then(books =>{
              data.books = books;
              res.json(data);
            });
        });
    });
});

router.get('/edit/:id', (req, res, next) =>{
  res.render('edit_author');
});

router.post('/edit', (req, res, next) =>{
  console.log(req.body);
});

router.get('/new', (req, res, next) =>{
  res.render('create_author')
});

router.post('/new', (req, res, next) =>{
  dt.Author()
    .insert({
      author_name: req.body.name,
      author_image_url: req.body.image,
      author_info: req.body.bio
    })
    .returning('author_id')
    .then(newID =>{
      dt.AuthorBook()
        .insert({
          author_id: +newID,
          created_at: dt.Now()
        })
        .returning('author_book_id')
        .then(ID =>{
          dt.Biblio()
            .insert({
              author_book_id: +ID,
              book_author_id: 2
            })
            .then(response =>{
              res.redirect('/authors')
            });
        });
    });
});

module.exports = router;
