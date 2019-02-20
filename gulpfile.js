let gulp = require('gulp');

// -----------------------------------------------------------------------------
// | Helper tasks                                                              |
// -----------------------------------------------------------------------------

gulp.task('clean', function (done) {
  require('del')([
    'dist'
  ], done);
});

gulp.task('build', [
  'copy:index.html',
  'copy:main.css',
  'copy:misc',
  'copy:normalize'
]);

gulp.task('copy:index.html', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy:main.css', function () {
  return gulp.src('src/css/main.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy:misc', function () {
  return gulp.src([

    // Copy all files
    'src/**/*',

    // Exclude the following files
    // (other tasks will handle the copying of these files)
    '!src/css/main.css',
    '!src/js/main.js',
    '!src/index.html'

  ], {

  }).pipe(gulp.dest('dist'));
});

gulp.task('copy:normalize', function () {
  return gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['build']);
