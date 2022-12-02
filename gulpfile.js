const {src, dest, series, parallel, watch} = require('gulp');
const browserSync = require("browser-sync").create();
const del = require('del');
const gulpSass = require('gulp-sass')(require('sass'));
const concatCss = require('gulp-concat');
const cssmin = require('gulp-css-minify');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require("gulp-imagemin")

const distFolder = "dist"

function cleanDist() {
	return del('dist/*');
}

function html(d){
    src("./*.html").pipe(dest(distFolder));
    d();
}

function css(d){
    src('src/sass/*.scss').pipe(gulpSass().on('error', gulpSass.logError)).pipe(autoprefixer({
        browsers:['last 2 versions'],
        cascade: false
    }))
    .pipe(concatCss('styles.min.css')).pipe(cleanCSS({compatibility: 'ie8'})).pipe(cssmin())
    .pipe(dest(distFolder));
    d();
}

function js(d){
    src("src/js/**.js").pipe(concat("scripts.min.js")).pipe(uglify()).pipe(dest('dist'))
    d();
}

function reset(d){
    src("src/reset/reset.css").pipe(cssmin()).pipe(dest(distFolder));
    d();
}

function imgmin(d) {
    src('src/img/*.*')
    .pipe(imagemin())
    .pipe(dest('dist/img'))
    d();
}

function watcher(){
    browserSync.init({
        server:{
            baseDir: distFolder,
        }
    });
    watch("src/**/*.*", series(html, css, js, reset, imgmin)).on("change", browserSync.reload);
}

exports.cleanDist = cleanDist;
exports.html = html;
exports.css = css;
exports.reset = reset;
exports.js = js;
exports.imgmin = imgmin;

exports.build = series(cleanDist, html, css, js, reset, imgmin);
exports.dev = watcher;