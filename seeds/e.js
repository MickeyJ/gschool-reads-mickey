
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('bibliography').del(),
    
    // author one
    knex('bibliography').insert({bibliography_id: 1, author_book_id: 1, book_author_id: 1}),
    knex('bibliography').insert({bibliography_id: 2, author_book_id: 1, book_author_id: 4}),

    // author two
    knex('bibliography').insert({bibliography_id: 3, author_book_id: 2, book_author_id: 3}),

    //author three
    knex('bibliography').insert({bibliography_id: 4, author_book_id: 3, book_author_id: 1}),
    knex('bibliography').insert({bibliography_id: 5, author_book_id: 3, book_author_id: 2}),
    knex('bibliography').insert({bibliography_id: 6, author_book_id: 3, book_author_id: 5}),
    knex('bibliography').insert({bibliography_id: 7, author_book_id: 3, book_author_id: 6})
  );
};
