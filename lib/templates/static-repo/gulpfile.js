// Gather used gulp plugins
var gulp = require('gulp');
    rename = require('gulp-rename');
    watch = require('gulp-watch');
    sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    jsmin = require('gulp-jsmin');
    imagemin = require('gulp-imagemin');
    styleguide = require('sc5-styleguide');
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
    input: './src/dev-scripts/**/*',
    output: './.dev/dev-scripts',
  },
  styleguide: {
    sass: [
      'src/sass/**/*.+(scss|sass)',
      'src/!sass/_*.+(scss|sass)'
    ],
    html: 'src/sass/**/*.html',
    output: 'styleguide',
  }
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
        /<!-- Development script|src="dev-scripts\/fronthack-dev.js"/i
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


// Styleguide start
// --------------------------------------------------
// Everything below is for rendering a styleguide.

// Define rendering styleguide task
// https://github.com/SC5/sc5-styleguide#build-options
gulp.task('styleguide-main:generate', function() {
  return gulp.src(paths.styleguide.sass)
    .pipe(styleguide.generate({
        title: 'Fronthack styleguide',
        server: true,
        sideNav: true,
        rootPath: paths.styleguide.output,
        overviewPath: 'README.md',
        commonClass: 'body',
        extraHead: [
          '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>',
          '<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.0/owl.carousel.min.js"></script>',
          '<script src="/js/owl-carousel.js"></script>',
        ],
        disableEncapsulation: true,
        disableHtml5Mode: true
      }))
    .pipe(gulp.dest(paths.styleguide.output));
});
gulp.task('styleguide-main:applystyles', function() {
  return gulp.src([
      'src/sass/app.sass',
      'src/sass/styleguide-overrides.sass'
    ])
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(paths.styleguide.output));
});
gulp.task('styleguide-main', ['styleguide-main:generate', 'styleguide-main:applystyles']);

// Define copying images for styleguide task
gulp.task('styleguide-images', function() {
  gulp.src(['src/images/**'])
    .pipe(gulp.dest(paths.styleguide.output + '/images'));
});

// Define copying javascript for styleguide task
gulp.task('styleguide-js', function() {
  gulp.src(['src/js/components/**'])
    .pipe(gulp.dest(paths.styleguide.output + '/js/components'));
});

// Define copying fonts for styleguide task
gulp.task('styleguide-fonts', function() {
  gulp.src(['src/fonts/**'])
    .pipe(gulp.dest(paths.styleguide.output + '/fonts'));
});

// GULP STYLEGUIDE - compiles Stylguide.
gulp.task('styleguide', [
    'styleguide-main',
    'styleguide-images',
    'styleguide-js',
    'styleguide-fonts'
  ], function() {
  gulp.watch([paths.sass.allfiles, paths.styleguide.html, paths.mustache.allfiles], [
    'styleguide-main',
    'styleguide-images',
    'styleguide-js',
    'styleguide-fonts'
  ]);
});
// Styleguide end
