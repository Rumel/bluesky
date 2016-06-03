var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('prep', function() {
    exec('npm install | jspm init');
});

gulp.task('build_dev', function() {
    exec('jspm bundle-sfx ./app/main.js app.js | npm run lite');
});

gulp.task('build_prod', function() {
    exec('jspm bundle-sfx ./app/main.js app.js --minify | npm run lite');
});