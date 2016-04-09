var gulp       = require('gulp'),
    uglify     = require('gulp-uglify'),
    sass       = require('gulp-sass'),
    reactify   = require('reactify'),
    babelify   = require('babelify'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    streamify = require('gulp-streamify');

// React [ ES2015 ]
// ***********************
gulp.task('create_author', function () {
  return browserify({entries: 'src/components/Author/CreateAuthor.js', extensions: ['.js'], debug: true})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('create_author.js'))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest('public/js'));
});
gulp.task('edit_author', function () {
  return browserify({entries: 'src/components/Author/EditAuthor.js', extensions: ['.js'], debug: true})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('edit_author.js'))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest('public/js'));
});

gulp.task('create_book', function () {
  return browserify({entries: 'src/components/Book/CreateBook.js', extensions: ['.js'], debug: true})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('create_book.js'))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest('public/js'));
});
gulp.task('edit_book', function () {
  return browserify({entries: 'src/components/Book/EditBook.js', extensions: ['.js'], debug: true})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('edit_book.js'))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest('public/js'));
});

// Scripts [ ES2015 ]
// ***********************
gulp.task('scripts', function () {
  browserify({entries: 'src/js/index.js', extensions: ['.js'], debug: true})
    .transform(babelify, { presets: ['es2015'] })
    .bundle()
    .pipe(source('script.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('public/js'));
});

// SCSS
// ***********************
gulp.task('sass', function(){
  gulp.src('src/scss/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./public/css'));
});


// Watcher
// *************************
gulp.task('watch', function(){
  gulp.watch('src/**/*.js', ['create_author', 'edit_author', 'create_book', 'edit_book']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['create_author', 'edit_author', 'create_book', 'edit_book', 'scripts', 'sass', 'watch']);