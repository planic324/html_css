'use strict';
var gulp = require('gulp');
var gulpsass = require("gulp-sass")(require('sass'));
var sourcemaps = require('gulp-sourcemaps');
var cleancss = require('gulp-clean-css');
var csslint = require('gulp-csslint');
var htmlReporter = require('gulp-csslint-report');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
// var through2 = require('through2');

// ★★★★ autoprefixer 옵션: 브라우저 버전 지정
const apfBrwsowsers = [
  'ie >= 8', // 익스플로러 버전 8 이상
];

gulp.task('skill', function (done) {
    gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(gulpsass({sourcemap: true, outputStyle: 'expanded'}).on('error', gulpsass.logError))
        // .pipe(prefix({browser:["last 2 version", "> 1%", "ie 8", "ie 7"],cascade:false,flexbox:false}))
        .pipe(cleancss({format: 'keep-breaks' }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('css/'));

    done();
});
gulp.task('skill:watch', function (done) {
    gulp.watch('scss/**/*.scss', gulp.series('skill'));
    done();
});


// gulp.task(
//     "default",
//     gulp.parallel("gulpsass") 
// );
