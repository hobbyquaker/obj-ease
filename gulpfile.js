var gulp = require('gulp');
var mocha = require('gulp-mocha');
var benchmark = require('gulp-bench');
var jsdoc2md = require('jsdoc-to-markdown');


gulp.task('test', function () {
    return gulp.src('tests/**/*.js', {read: false})
        .pipe(mocha());
});

gulp.task('bench', function () {
    return gulp.src('benchmarks/**/*.js', {read: false})
        .pipe(benchmark());
});

gulp.task('docs', function () {
    var fs = require('fs');

    var output = fs.readFileSync('doc/README.header.md');
    output +=jsdoc2md.renderSync({files: './index.js'});
    output += fs.readFileSync('doc/README.footer.md');
    fs.writeFileSync('README.md', output)
});
