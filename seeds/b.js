'use strict';

const bookNames = [
  '',
  'Player Piano',
  'All About Things',
  'The Sacred Path of the Warrior',
  'Breakfast of Champions',
  'Stuff and Things',
  'More Things and Stuff'
];
const bookGenres= [
  '',
  'sci-fi',
  'education',
  'spiritual',
  'adventure',
  'education',
  'education'
];
const bookImages= [
  '',
  'http://www.hollywoodinvestigator.com/2005/Player%20Piano%20book.jpg',
  'http://www.stuff.co.nz/etc/designs/ffx/nz/stuff/social-media-logos/stuff-180x180.jpg',
  'http://new.herownperson.com/wp-content/uploads/2015/09/sg.png',
  'https://upload.wikimedia.org/wikipedia/en/thumb/4/46/BreakfastOfChampions(Vonnegut).jpg/220px-BreakfastOfChampions(Vonnegut).jpg',
  'http://news.nationalgeographic.com/content/dam/news/photos/000/557/55739.adapt.768.1.jpg',
  'http://1.bp.blogspot.com/-0WagJ8BL5WU/U5UKkIPfJ6I/AAAAAAAAB1c/BOpklEXhEWY/s1600/Quasi.jpg'
];
const bookDescriptions = [
  '',
  'about the future of engineering, through the eyes of Kurt Vonnegut that is.',
  'mostly about about javascript... and squirrels.',
  "you'll just have to read it.",
  'all about mr Kilgore Trout.',
  'A must read... especially if you like stuff.',
  'If you though Stuff and Things was great, this takes it to a whole new level.'
];

exports.seed = function(knex, Promise) {
  const seedBooks = [];

  for(let i=1; i <= 6; i++){
    seedBooks.push({
      book_id: i,
      book_name: bookNames[i],
      book_genre: bookGenres[i],
      book_image_url: bookImages[i],
      book_description: bookDescriptions[i]
    })
  }
  return Promise.join(
    knex('book').del(),
    knex('book').insert(seedBooks)
  );
};
