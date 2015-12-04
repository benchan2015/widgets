var gulp = require('gulp');
var rimraf = require('gulp-rimraf');

// 清空生成文件
gulp.task('clean', function() {
    return gulp.src(['./build/*'], {
            read: false
        })
        .pipe(rimraf());
});