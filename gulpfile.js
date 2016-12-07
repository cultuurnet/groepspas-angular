var gulp = require('gulp'),
    rimraf = require('rimraf'),
    plugins = require('gulp-load-plugins')({
        lazy: true
    }),
    runSequence = require('run-sequence');

var sass = require('gulp-sass');

var input = './src/styles/**/*.scss';
var output = './src/css';

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

gulp.task('sass', function () {
    return gulp
      .src(input)
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(gulp.dest(output));
});

var paths = {
    dist: 'dist'
};

gulp.task('clean:dist', function(done) {
    rimraf(paths.dist, done);
});

gulp.task('dev-server', plugins.shell.task('webpack-dev-server --inline --colors --progress --port 3000'));

gulp.task('build', plugins.shell.task([
    'rimraf dist',
    'webpack --config config/webpack.prod.js --progress --colors --profile --bail'
]));

gulp.task('serve', function(done) {
    runSequence('clean:dist', 'sass', 'dev-server', done);
});

