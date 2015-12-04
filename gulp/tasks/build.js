var gulp = require('gulp');
var sass = require('gulp-sass');

var runSequence = require('run-sequence');

//处理sass
gulp.task('sass', function() {
    return gulp.src(['./src/sass/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});

//处理sass
gulp.task('build', function() {
    gulp.src(['./src/demo/**'])
        .pipe(gulp.dest('./build/demo'));
    gulp.src(['./src/lib/**'])
        .pipe(gulp.dest('./build/javascripts'));
    gulp.src(['./src/images/**'])
        .pipe(gulp.dest('./build/images'));
    runSequence(['sass']);

});
