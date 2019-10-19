
const { series, src, dest } = require('gulp')
const gclean = require('gulp-clean')
const grename = require('gulp-rename')
const uglify = require('gulp-uglify')

let num = 100

function clean (params) {
    return src('demo/dist', { read: false, allowEmpty: true })
        .pipe(gclean(), cb => cb())
}

function copy (params) {
    return src('demo/src/*.js', { sourcemaps: true })
        .pipe(dest('demo/dist/'))
        .pipe(uglify())
        .pipe(grename({ prefix: `${num++}-`, extname: '.min.js' }))
        .pipe(dest(`demo/dist/`, { sourcemaps: '.' }))
}

exports.clean = clean
exports.copy = copy
exports.default = series(clean, copy)