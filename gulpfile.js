var path = require('path');
var fs = require('fs');
var fileContent = fs.readFileSync('./package.json');
var jsonObj = JSON.parse(fileContent);

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var del = require('del');
var connect = require('gulp-connect');
var jade = require('gulp-jade');

var paths = {
  build: './build/' + jsonObj.name + '/' + jsonObj.version
}

gulp.task('clean',function(cb){
  del(['build'], cb);
});

var YOUR_LOCALS = {};
gulp.task('jadeCompile',['stylCompile'],function(){
 	gulp.src('./app/**/*.html')
    // .pipe(jade({
    //   locals: YOUR_LOCALS
    // }))
    .pipe(gulp.dest(paths.build))
});

gulp.task('copy-image', function() {
  gulp.src(['./app/**/*.jpg','./app/**/*.png'])
    // .pipe(stylus())
    .pipe(gulp.dest(paths.build))
});
gulp.task('stylCompile',['copy-image'],function() {
  gulp.src('./app/**/*.styl')
    .pipe(stylus({
        compress:true
    }))
    // .pipe(stylus())
    .pipe(gulp.dest(paths.build))
});

gulp.task('reload', function () {
  gulp.src('./build/**/*.*')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.*'],['jadeCompile']);
  gulp.watch(['./build/**/*.*'], ['reload']);
});

gulp.task("connect",function(){
  connect.server({
    root : "./build",
    host: "localhost",
    port : 8082,
    livereload: true
  });
});

gulp.task('default', ['connect','watch']);