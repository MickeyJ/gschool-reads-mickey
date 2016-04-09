var knex = require('./knex');

exports.Author = () => knex('author');
exports.Book = () => knex('book');
exports.AuthorBook = () => knex('author_book as AB');
exports.BookAuthor = () => knex('book_author as BA');
exports.Biblio = () => knex('bibliography');
exports.Now = () => knex.fn.now();