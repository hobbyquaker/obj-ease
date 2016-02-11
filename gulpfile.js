var gulp = require('gulp');
var mocha = require('gulp-mocha');
var benchmark = require('gulp-bench');

gulp.task('test', function () {
    return gulp.src('tests/**/*.js', {read: false})
        .pipe(mocha());
});

gulp.task('bench', function () {
    return gulp.src('benchmarks/**/*.js', {read: false})
        .pipe(benchmark());
});