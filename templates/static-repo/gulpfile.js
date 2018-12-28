// Gather used gulp plugins
var gulp = require('gulp');
    rename = require('gulp-rename');
    watch = require('gulp-watch');
    sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    jsmin = require('gulp-jsmin');
    imagemin = require('gulp-imagemin');
    mustache = require('gulp-mustache');
    deleteLines = require('gulp-delete-lines');
    server = require('gulp-server-livereload');
    imageminJpegRecompress = require('imagemin-jpeg-recompress');
    vfs = require('vinyl-fs');


// Set paths
var paths = {
  sass: {
    input: 'src/sass/app.sass',
    allfiles: 'src/sass/**/*.+(scss|sass)',
    output: 'dist/css',
    outputDev: '.dev/css'
  },
  js: {
    input: 'src/js/**/*.+(js|json)',
    output: 'dist/js',
    outputDev: '.dev/js'
  },
  mustache: {
    input: './src/*.html',
    allfiles: './src/**/*.{html,mustache}',
    output: './dist',
    outputDev: './.dev'
  },
  fonts: {
    input: './src/fonts/**/*',
    output: './dist/fonts',
    outputDev: './.dev/fonts'
  },
  images: {
    input: './src/images/**/*',
    output: './dist/images',
    outputDev: './.dev/images'
  },
  devScripts: {
    input: './node_modules/fronthack-scripts/**/*',
    output: './.dev',
  },
};


// Define SASS compiling and minifying
gulp.task('sass', function () {
  gulp.src(paths.sass.input)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('style.bundle.css'))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.sass.output))
});
// Define SASS compiling
gulp.task('sass-dev', function () {
  gulp.src(paths.sass.input)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.bundle.css'))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.sass.outputDev))
});
// Define JS copying and minifying
gulp.task('js', function () {
  gulp.src(paths.js.input)
    .pipe(jsmin())
    .pipe(gulp.dest(paths.js.output));
});
// Define JS copying
gulp.task('js-dev', function () {
  gulp.src(paths.js.input)
    .pipe(gulp.dest(paths.js.outputDev));
});
// Define development files copying
gulp.task('dev-scripts', function () {
  gulp.src(paths.devScripts.input)
    .pipe(gulp.dest(paths.devScripts.output));
});
// Define Mustache compiling and removing dev scripts
gulp.task('mustache', function() {
  gulp.src(paths.mustache.input)
    .pipe(mustache())
    .pipe(deleteLines({
      'filters': [
        /<!-- Development script|src="fronthack-scripts\/index.js"/i
      ]
    }))
    .pipe(gulp.dest(paths.mustache.output));
});
// Define Mustache compiling
gulp.task('mustache-dev', function() {
  gulp.src(paths.mustache.input)
    .pipe(mustache())
    .pipe(gulp.dest(paths.mustache.outputDev));
});
// Define Font files copying
gulp.task('fonts', function() {
  gulp.src(paths.fonts.input)
    .pipe(gulp.dest(paths.fonts.output));
});
// Define Font files copying.
gulp.task('fonts-dev', function() {
  gulp.src(paths.fonts.input)
    .pipe(gulp.dest(paths.fonts.outputDev));
});
// Define Assets compiling and minifying.
gulp.task('images', function() {
  gulp.src(paths.images.input)
    .pipe(imagemin([
      imageminJpegRecompress({method: 'mpe', max: 85}),
      imagemin.optipng({optimizationLevel: 5})
    ], {
    	verbose: true
    }))
    .pipe(gulp.dest(paths.images.output));
});
// Define Assets copying.
gulp.task('images-dev', function() {
  gulp.src(paths.images.input)
    .pipe(gulp.dest(paths.images.outputDev));
});
// Define creating of symlink to designs
gulp.task('designs', function() {
  vfs.src('src/designs', {followSymlinks: false})
  .pipe(vfs.symlink('.dev'));
});

// Define localhost server
gulp.task('devserver', function() {
  gulp.src('.dev')
    .pipe(server({
      livereload: true
    }));
});


// GULP DEV - compiles .dev and dist directories, run local server.
gulp.task('dev', [
    'sass-dev',
    'js-dev',
    'mustache-dev',
    'fonts-dev',
    'images-dev',
    'designs',
    'dev-scripts',
    'devserver'
  ], function() {
  gulp.watch([
    paths.sass.allfiles,
    paths.mustache.allfiles,
    paths.images.input,
    paths.js.input,
    paths.devScripts.input
  ], [
    'sass-dev',
    'js-dev',
    'mustache-dev',
    'fonts-dev',
    'images-dev',
    'designs',
    'dev-scripts'
  ]);
});

// GULP BUILD - compiles dist directory.
gulp.task('build', [
    'sass',
    'js',
    'mustache',
    'fonts',
    'images'
]);
