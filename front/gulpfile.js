var gulp = require('gulp');
var extender = require('gulp-html-extend');
var sass = require('gulp-ruby-sass');
var rev = require('gulp-rev-append');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var prefixer = require('gulp-autoprefixer');

gulp.task('extend', function(){
    gulp.src('./build/pages/*.html')
    .pipe(extender({annotations:false,verbose:false}))
    .pipe(rev())
    .pipe(gulp.dest('./publish'))
});

gulp.task('scss', function() {
    return sass('./build/scss',  { sourcemap: false })
    .pipe(prefixer())
    .pipe(minify())
    .pipe(gulp.dest('./publish/css'));
});

gulp.task('minjs',function(){
   gulp.src('./build/js/*.js')
   .pipe(uglify())
   .pipe(gulp.dest('./publish/js'))  
});

gulp.task('watch', function() {
    gulp.watch('./build/pages/*.html', ['extend']);
    gulp.watch('./build/scss/*.scss', ['scss']);
    gulp.watch('./build/js/*.js', ['minjs']);
});

gulp.task('default', ['watch', 'scss', 'extend', 'minjs']);

