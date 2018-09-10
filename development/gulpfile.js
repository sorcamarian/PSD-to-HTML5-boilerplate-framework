let gulp         = require('gulp'),
    scss         = require('gulp-sass'),
    cleanCSS     = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    pump         = require('pump');

/* Production paths
*/
const PRODUCTION_DIR_PATH            = "../production",
      PRODUCTION_CSS_DIR_PATH        = `${PRODUCTION_DIR_PATH}/resources/css`;

const PRODUCTION_JAVASCRIPT_DIR_PATH = `${PRODUCTION_DIR_PATH}/resources/javascript`;


/* Development paths
*/
const ALL_SCSS_DIR_PATH     = "./scss",
      MAIN_SCSS_DIR_PATH    = `${ALL_SCSS_DIR_PATH}/style`
      MAIN_SCSS_FILE_PATH   = `${ALL_SCSS_DIR_PATH}/style/style.scss`
      FONTS_SCSS_DIR_PATH   = `${ALL_SCSS_DIR_PATH}/fonts`;
      FONTS_SCSS_FILE_PATH  = `${ALL_SCSS_DIR_PATH}/fonts/fonts.scss`;

const ALL_JAVASCRIPT_DIR_PATH   = "./javascript",
      MAIN_JAVASCRIPT_FILE_PATH = `${ALL_JAVASCRIPT_DIR_PATH}/script.js`;



/*
    SCSS
    SCSS
    SCSS
*/

// Main SCSS style
gulp.task('compile-main-scss', () => {
    gulp.src(MAIN_SCSS_FILE_PATH)
        .pipe( scss() )
        .pipe( autoprefixer() )
        .pipe( gulp.dest(PRODUCTION_CSS_DIR_PATH) )
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe( gulp.dest(PRODUCTION_CSS_DIR_PATH) )
});
gulp.task('watch-main-scss', () => {
  gulp.watch(`${MAIN_SCSS_DIR_PATH}/**/*.scss`, ["compile-main-scss"]);
});

// Fonts, in a SCSS file
gulp.task('compile-fonts-scss', () => {
    gulp.src(FONTS_SCSS_FILE_PATH)
        .pipe( scss() )
        .pipe( autoprefixer() )
        .pipe( gulp.dest(PRODUCTION_CSS_DIR_PATH) )
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe( gulp.dest(PRODUCTION_CSS_DIR_PATH) )
});
gulp.task('watch-fonts-scss', () => {
    gulp.watch(`${FONTS_SCSS_DIR_PATH}/**/*.scss`, ["compile-fonts-scss"] );
});



/*
    Javascript
    Javascript
    Javascript
*/

gulp.task('uglify-javascript-files', (callback) => {
    pump([
      gulp.src(`${ALL_JAVASCRIPT_DIR_PATH}/*.js`),
      uglify(),
      rename({
          suffix: '.min'
      }),
      gulp.dest(PRODUCTION_JAVASCRIPT_DIR_PATH)
    ],
      callback
    );
});
gulp.task('copy-javascript-files-dev-to-production', () => {
    gulp.src(`${ALL_JAVASCRIPT_DIR_PATH}/*.js`)
         .pipe( gulp.dest(PRODUCTION_JAVASCRIPT_DIR_PATH) )
});
gulp.task('watch-javascript-files', () => {
    gulp.watch(`${ALL_JAVASCRIPT_DIR_PATH}/**/*.js`,
      [
        "uglify-javascript-files",
        "copy-javascript-files-dev-to-prod"
      ]
    );
});



gulp.task('default',
  [
   "compile-main-scss",
   "compile-fonts-scss",
   "watch-main-scss",
   "watch-fonts-scss",
   "uglify-javascript-files",
   "copy-javascript-files-dev-to-production",
   "watch-javascript-files"
  ]
);
