var express = require('express');
var router = express.Router();
const url = require('url');

router.get('/', (req, res, next) =>{
  res.render('index', {
  });
});

router.get('/search', function(req, res, next) {
  res.json({
    authors: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/authors/data' }),
    books: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/books/data' }),
    author_by_id: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/authors/data/1' }),
    book_by_id: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/books/data/1' })
  })
});

module.exports = router;
