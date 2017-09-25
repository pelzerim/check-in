var gulp = require('gulp');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

var path = {
    JS: [
        'app/common/**/**/*.js',
        'app/*.js'
    ],

    SASS: [
        'styles/*.scss',
        'styles/**/*.scss'
    ]
};

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        port: 8000
    });
});

gulp.task('sass', function () {
    return gulp.src(path.SASS)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('app/dist'));
});

gulp.task('watch', function () {
    gulp.watch(path.SASS, ['sass']);
});

var all_tasks = [ 'sass', 'watch', 'connect'];
gulp.task('dev', all_tasks);