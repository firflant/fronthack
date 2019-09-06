// Gather used gulp plugins
const gulp = require('gulp')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const jsmin = require('gulp-jsmin')
const imagemin = require('gulp-imagemin')
const mustache = require('gulp-mustache')
const deleteLines = require('gulp-delete-lines')
const server = require('gulp-server-livereload')
const imageminJpegRecompress = require('imagemin-jpeg-recompress')
const vfs = require('vinyl-fs')
const babel = require('gulp-babel')
const mode = require('gulp-mode')({
  modes: ['production', 'development'],
  default: 'development',
})


// Set paths
const paths = {
  sass: {
    input: 'src/sass/app.sass',
    allfiles: 'src/sass/**/*.+(scss|sass)',
    output: mode.production() ? 'dist/css' : '.dev/css',
  },
  js: {
    input: 'src/js/**/*.+(js|json)',
    output: mode.production() ? 'dist/js': '.dev/js',
  },
  mustache: {
    input: './src/*.html',
    allfiles: './src/**/*.{html,mustache}',
    output: mode.production() ? './dist' : './.dev',
  },
  fonts: {
    input: './src/fonts/**/*',
    output: mode.production() ? './dist/fonts' : './.dev/fonts',
  },
  images: {
    input: './src/images/**/*',
    output: mode.production() ? './dist/images' : './.dev/images',
  },
  devScripts: {
    input: './node_modules/fronthack-scripts/**/*',
    output: './.dev',
  },
}


// Define SASS compiling
gulp.task('sass', () => {
  gulp.src(paths.sass.input)
    .pipe(sass(mode.production() ? { outputStyle: 'compressed' } : {})
      .on('error', sass.logError
    ))
    .pipe(rename('style.bundle.css'))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.sass.output))
})

// Define JS transpilation and copying
gulp.task('js', () => {
  gulp.src(paths.js.input)
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(mode.production(jsmin()))
    .pipe(gulp.dest(paths.js.output))
})

// Define development files copying
gulp.task('dev-scripts', () => {
  gulp.src(paths.devScripts.input)
    .pipe(gulp.dest(paths.devScripts.output))
})

// Define Mustache compiling and removing dev scripts
gulp.task('mustache', () => {
  gulp.src(paths.mustache.input)
    .pipe(mustache())
    .pipe(mode.production(deleteLines({
      'filters': [
        /<!-- Development scripts/i
      ]
    })))
    .pipe(gulp.dest(paths.mustache.output))
})

// Define Font files copying
gulp.task('fonts', () => {
  gulp.src(paths.fonts.input)
    .pipe(gulp.dest(paths.fonts.output))
})

// Define Assets compiling and minifying.
gulp.task('images', () => {
  gulp.src(paths.images.input)
    .pipe(mode.production(imagemin([
      imageminJpegRecompress({method: 'mpe', max: 85}),
      imagemin.optipng({optimizationLevel: 5})
    ], {
    	verbose: true
    })))
    .pipe(gulp.dest(paths.images.output))
})

// Define symlink to designs creation
gulp.task('designs', () => {
  vfs.src('src/designs', {followSymlinks: false})
  .pipe(vfs.symlink('.dev'))
})

// Define localhost server
gulp.task('devserver', () => {
  gulp.src('.dev')
    .pipe(server({
      livereload: true
    }))
})


// Compose primary gulp task.
gulp.task(
  'default', [
    'sass',
    'js',
    'mustache',
    'fonts',
    'images',
    ...(mode.development() ? [
      'designs',
      'dev-scripts',
      'devserver'
    ] : []),
  ],
  mode.development() ? () => {
    gulp.watch([
      paths.sass.allfiles,
      paths.mustache.allfiles,
      paths.images.input,
      paths.js.input,
      paths.devScripts.input
    ], [
      'sass',
      'js',
      'mustache',
      'fonts',
      'images',
      'designs',
      'dev-scripts'
    ])
  } : null
)
