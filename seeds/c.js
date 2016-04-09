
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('author_book').del(),

    knex('author_book').insert({author_book_id: 1, author_id: 1, created_at: knex.fn.now()}),
    knex('author_book').insert({author_book_id: 2, author_id: 2, created_at: knex.fn.now()}),
    knex('author_book').insert({author_book_id: 3, author_id: 3, created_at: knex.fn.now()})
  );
};
