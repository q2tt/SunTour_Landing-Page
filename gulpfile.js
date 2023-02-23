const gulp = require('gulp')
const del = require('del')
const less = require('gulp-less');
const path = require('path');
const rename = require('gulp-rename')
const cleanSCC = require('gulp-clean-css')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require ('gulp-imagemin');
const newer = require('gulp-newer');


const paths = {
    styles: {
        src: 'src/styles/style.css',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/img/*',
        dest: 'dist/img'
    }
}

const LESS_PARAMS = {
    globalVars: {
      webUiVersion: '"0.0.0"'
    }
  };

function clean(){
    return del(['dist/*', '!dist/img'])
}

function styles (){
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(less((LESS_PARAMS)))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cleanSCC({
        level: 2
    }))
    .pipe(rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
}

function scripts (){
    return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
}

function img(){
 return	gulp.src(paths.images.src)
        .pipe(newer(paths.images.dest))
		.pipe(imagemin({
            progressive: true
        }))
		.pipe(gulp.dest(paths.images.dest))
};

function watch(){
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, img), watch)


exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.img = img;
exports.build = build;
exports.default = build;