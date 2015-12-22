var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    glob = require('glob'),

    config = {
      app: './app'
    };

gulp.task('build', function () {
    var filesToBundle = glob.sync('./app/js/**/*.js');

    return browserify({entries: filesToBundle, extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('eslint', function gulpTaskESLint() {
  gulp.src([config.app + '/js/**/*.js'])
    .pipe(plumber({
      errorHandler: function plumberScripts(err) {
        notify.onError({
          title: 'ESLint Compile Error',
          message: '<%= error.message %>',
          sound: 'Sosumi'
        })(err);
        this.emit('end');
      }
    }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(notify({
      message: 'ESLint complete'
    }));
});
