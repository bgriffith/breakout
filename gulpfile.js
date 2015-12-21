var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    glob = require('glob');

gulp.task('build', function () {
    var filesToBundle = glob.sync('./app/js/**/*.js');

    return browserify({entries: filesToBundle, extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist/js'));
});