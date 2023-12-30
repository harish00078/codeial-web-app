const gulp = require('gulp');
// import gulp from ('gulp');
const sass = require('gulp-sass');
// import sass from ('gulp-sass');
const cssnano = require('gulp-cssnano');
// import cssnano from ('gulp-cssnano');
const rev = require('gulp-rev');
// import rev from ('gulp-rev');

gulp.task('css',function(){
    console.log('minifying css....');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
})