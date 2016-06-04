var gulp = require('gulp');
var exec = require('child_process').exec;
var jspm = require('gulp-jspm-build');

gulp.task('prep', function() {
    exec('npm install');
});

gulp.task('compile', function() {
    exec('npm run tsc');
});

gulp.task('build_dev', ['compile'], function(){
    jspm({
      bundleOptions: {
        minify: false,
        mangle: false
      },
      bundles: [
        { src: './app/main.js', dst: 'app.js' }
      ],
      config: "",
      bundleSfx: true
    })
    .pipe(gulp.dest('./'));
});

gulp.task('build_prod', ['compile'], function(){
    jspm({
      bundleOptions: {
        minify: true,
        mangle: true
      },
      bundles: [
        { src: './app/main.js', dst: 'app.js' }
      ],
      config: "",
      bundleSfx: true
    })
    .pipe(gulp.dest('./'));
});

