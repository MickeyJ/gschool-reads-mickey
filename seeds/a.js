'use strict';
const authorNames = [
  '',
  'Kurt Vonnegut',
  'Chogyam Trungpa',
  'Bob Andersmith'
];
const authorImages= [
  '',
  'https://tomreeder.files.wordpress.com/2010/04/kurt-vonnegut.jpg',
  'http://www.mindpodnetwork.com/mpn/wp-content/uploads/2015/02/Screen-Shot-2015-02-15-at-9.54.54-PM-1050x700.png',
  'https://i.ytimg.com/vi/83OILqFV1gw/maxresdefault.jpg'
];
const authorInfo= [
  '',
  "Idk but he's pretty fuckin awsome",
  'founded Naropa and Shambhala in the US',
  'Im Bob. I write books. I know so much.'
];

exports.seed = function(knex, Promise) {
  const seedBooks = [];

  for(let i=1; i <= 3; i++){
    seedBooks.push({
      author_id: i,
      author_name: authorNames[i],
      author_image_url: authorImages[i],
      author_info: authorInfo[i]
    })
  }
  return Promise.join(
    knex('bibliography').del(),
    knex('author_book').del(),
    knex('book_author').del(),
    knex('author').del(),
    knex('author').insert(seedBooks)
  );
};
