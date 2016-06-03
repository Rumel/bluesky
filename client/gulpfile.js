var gulp = require('gulp');
var exec = require('child_process').exec;
var jspm = require('gulp-jspm-build');

gulp.task('prep', function() {
    exec('npm install');
});


gulp.task('build_dev', function(){
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

    exec('npm run lite');
});

gulp.task('build_prod', function(){
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

    exec('npm run lite');
});

