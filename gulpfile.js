const gulp = require('gulp')
const sass = require('gulp-sass')
const del = require('del')
const nodemon = require('nodemon')

gulp.task('clean', () => del(['public/']))

gulp.task('copy-toolkit-assets', gulp.series('clean', () => {
  return gulp.src('./node_modules/govuk-frontend/assets/**/*.*')
    .pipe(gulp.dest('./public/assets'))
}))

gulp.task('sass', gulp.series('copy-toolkit-assets', () => {
  return gulp.src('./src/assets/sass/**/*.scss')
    .pipe(sass({
      includePaths: 'node_modules'
    }))
    .pipe(gulp.dest('./public/stylesheets'))
}))

gulp.task('nodemon', (done) => {
  let started = false

  return nodemon({
    script: 'server.js',
    ext: 'js html'
  }).once('start', () => {
    // To avoid nodemon being started multiple times
    if (!started) {
      started = true
      done()
    }
  })
})

// The default Gulp task starts the app in development mode
gulp.task('default', gulp.series('sass', 'nodemon'))
