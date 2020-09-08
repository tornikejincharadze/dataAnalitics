const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const del = require('del');
const browserSync = require('browser-sync').create();
const { src, dest, parallel } = require('gulp');


function delTask() {
    return del([
        'dist/**',
    ]);
}

function scssTask() {
    return gulp.src('./src/scss/index.scss')
        // scss to css
        .pipe(sass())
        // css to minified css
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
};

function jsTask() {
    return src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('index.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

function imgTask() {
    return src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
        .pipe(browserSync.stream());
}

function copyIcons() {
    return src('./src/icons/*.svg').pipe(gulp.dest('./dist/icons'));
}

function copyFonts() {
    return src('./src/fonts/**/*').pipe(gulp.dest('./dist/fonts'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./src/scss/**/*.scss', scssTask);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./src/images/*').on('change', imgTask);
    gulp.watch('./src/js/**/*.js').on('change', jsTask);
    gulp.watch('./src/icons/*').on('change', browserSync.reload);
}

exports.scssTask = scssTask;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.copyIcons = copyIcons;
exports.copyFonts = copyFonts;
exports.watch = watch;
exports.default = parallel(delTask, scssTask, jsTask, imgTask, copyIcons, copyFonts, watch);