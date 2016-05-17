/*
 * Created with Sublime Text 2.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * User: 田想兵
 * Date: 2016-05-17
 * Time: 10:15:51
 * Contact: 55342775@qq.com
 */
var gulp = require('gulp'),
    rjs = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    watchF = require('gulp-watch');
var paths = {
    script: 'src/*.js',
    css: 'src/*.css'
};
gulp.task('js', function() {
    return gulp.src(paths.script).pipe(uglify()).pipe(gulp.dest('dist'));
});
gulp.task('css', function() {
    return gulp.src(paths.css)
        .pipe(cssmin({
            compatibility: 'ie8'
        })) //兼容ie
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('dest'));
});
gulp.task('watch',function(){
    watchF(['src/*.*','html/*.*'],function(){
        gulp.start('default')
    });
});
gulp.task('default', ['js', 'css']);