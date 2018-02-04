// Gulpfile
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    pug = require('gulp-pug');



// Move Index to distribution folder
// ** copy **
gulp.task('copy', function () {
    gulp.src('index.html')
        .pipe(gulp.dest('dist'))
});

// ** log **
gulp.task('log', function () {
    gutil.log('== My Log Task ==')
});

// PreProcessing Sass to CSS and logging the error if it occurs.
// ** sass **
gulp.task('sass', function () {
    gulp.src('styles/app.scss')
        .pipe(sass({ style: 'expanded' }))
        .on('error', gutil.log)
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
});

// Process CoffeeScript to JS 
// ** coffee ** 
gulp.task('coffee', function () {
    gulp.src('scripts/hello.coffee')
        .pipe(coffee({ bare: true })
            .on('error', gutil.log))
        .pipe(gulp.dest('scripts'))
});

// Put together all js files into a single one
// ** js ** 
gulp.task('js', function () {
    gulp.src('scripts/*.js')
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
});


// ** html **
gulp.task('html', function () {
    gulp.src(['**/*.html'])
        .pipe(connect.reload())
});


// Watch
gulp.task('watch', function () {
    gulp.watch('scripts/hello.coffee', ['coffee']);
    gulp.watch('scripts/*.js', ['js']);
    gulp.watch('**/**.scss', ['sass']);
    gulp.watch('**/*.html', ['html']);
    gulp.watch('**/*.pug', ['pug']);
});

// Live reload 
gulp.task('connect', function () {
    gulp.start('pug');
    connect.server({
        root: '.',
        livereload: true
    });

});


// ** pug **
gulp.task('pug', function () {

    gulp.src('includes/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(pug().on('error', gutil.log))
        .pipe(gulp.dest('./'))
});


// Default task to run all the processing
// ** gulp ** 
gulp.task('default', ['html', 'coffee', 'js', 'sass', 'pug', "copy", 'connect', 'watch']);