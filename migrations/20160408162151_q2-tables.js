
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('author', function(table){
      table.increments('author_id');
      table.string('author_name');
      table.string('author_image_url');
      table.string('author_info');
    })
    .createTable('book', function(table){
      table.increments('book_id');
      table.string('book_name');
      table.string('book_genre');
      table.string('book_image_url');
      table.string('book_description');
    })
    .createTable('author_book', function(table) {
      table.increments('author_book_id');
      table.integer('author_id').unsigned().references('author_id').inTable('author');
      table.timestamps();
    })
    .createTable('book_author', function(table) {
      table.increments('book_author_id');
      table.integer('book_id').unsigned().references('book_id').inTable('book');
      table.timestamps();
    })
    .createTable('bibliography', function(table) {
      table.increments('bibliography_id');
      table.integer('author_book_id').unsigned().references('author_book_id').inTable('author_book');
      table.integer('book_author_id').unsigned().references('book_author_id').inTable('book_author');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('bibliography')
    .dropTable('book_author')
    .dropTable('author_book')
    .dropTable('book')
    .dropTable('author')
};
