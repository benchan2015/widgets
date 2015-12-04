var gulp = require('gulp');
var config = require('../config');
var runSequence = require('run-sequence');



/*添加监视*/
gulp.task('watch', function() {
    if (config.env === 'dev') {
        gulp.watch('./src/common/stylesheets/**/*.scss').on('change', function() {
            runSequence(['sass']);
        });
        gulp.watch('./src/**/*.html', ['copy-html', 'connect-reload']).on('change', function() {
            runSequence(['copy-html'], ['connect-reload']);
        });
        gulp.watch('./src/**/*.js').on('change', function() {
            runSequence(['wp-dev'], ['connect-reload']);
        });
    }
})