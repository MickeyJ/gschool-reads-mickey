var express = require('express');
var router = express.Router();
const dt = require('../db/tables');


router.get('/', function(req, res, next) {
  const data = {};

  dt.Book()
    .then((books) =>{
      data.books = books;
      const bookIDs = books.map(x =>(
        x.book_id
      ));
      dt.Biblio()
        .whereIn('book_author_id', bookIDs)
        .pluck('author_book_id')
        .then(authorIDs =>{
          dt.Author()
            .whereIn('author_id', authorIDs)
            .then(authors =>{
              data.authors = authors;
              // res.json(data);
              res.render('books',{
                Books: data.books,
                Authors: data.authors
              });
            });
        });
    });
});

router.get('/search/:id', function(req, res, next) {
  const data = {};
  const id = req.params.id;
  dt.Book()
    .where({'book_id': id})
    .first()
    .then((book) =>{
      data.book = book;
      dt.Biblio()
        .where({'book_author_id': id})
        .pluck('author_book_id')
        .then(authorIDs =>{
          dt.Author()
            .whereIn('author_id', authorIDs)
            .then(authors =>{
              data.authors = authors;
              // res.json(data);
              res.render('book',{
                Book: data.book,
                Authors: data.authors
              });
            });
        });
    });
});

router.get('/data', function(req, res, next) {
  const data = {};

  dt.Book()
    .then((books) =>{
      data.books = books;
      const bookIDs = books.map(x =>(
        x.book_id
      ));
      dt.Biblio()
        .whereIn('book_author_id', bookIDs)
        .pluck('author_book_id')
        .then(authorIDs =>{
          dt.Author()
            .whereIn('author_id', authorIDs)
            .then(authors =>{
              data.authors = authors;
              res.json(data);
            });
        });
    });
});

router.get('/data/:id', function(req, res, next) {
  const data = {};
  const id = req.params.id;
  dt.Book()
    .where({'book_id': id})
    .first()
    .then((book) =>{
      data.book = book;
      dt.Biblio()
        .where({'book_author_id': id})
        .pluck('author_book_id')
        .then(authorIDs =>{
          dt.Author()
            .whereIn('author_id', authorIDs)
            .then(authors =>{
              data.authors = authors;
              res.json(data);
            });
        });
    });
});

router.get('/edit/:id', (req, res, next) =>{
  res.render('edit_book');
});

router.post('/edit', (req, res, next) =>{
  console.log(req.body);
});

router.get('/new', (req, res, next) =>{
  res.render('create_book')
});

router.post('/new', (req, res, next) =>{
  dt.Book()
    .insert({
      book_id: 7,
      book_name: req.body.name,
      book_genre: req.body.genre,
      book_image_url: req.body.image,
      book_description: req.body.description
    })
    .returning('book_id')
    .then(newID =>{
      dt.BookAuthor()
        .insert({
          book_author_id: +newID,
          book_id: +newID,
          created_at: dt.Now()
        })
        .returning('book_author_id')
        .then(ID =>{
          dt.Biblio()
            .insert({
              author_book_id: 2,
              book_author_id: +ID
            })
            .then(response =>{
              res.redirect('/authors')
            });
        });
    });
});
module.exports = router;