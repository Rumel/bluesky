var gulp = require('gulp');
var exec = require('child_process').exec;
var jspm = require('gulp-jspm-build');

gulp.task('prep', function() {
    exec('npm install');
});

gulp.task('compile', function(done) {
  exec('npm run tsc', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
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

