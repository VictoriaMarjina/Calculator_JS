const { watch, series, src, dest } = require('gulp');
const css = require('gulp-css');
const source = require('vinyl-source-stream');
const minifyCss = require('gulp-csso');
const browserify = require('browserify');
const browsriSync = require('browser-sync').create();

function jsHandle (cb) {
    browserify('./src/index.js').bundle()
    .pipe(source('index.js'))
    .pipe(dest('dest', { overwrite: true}))
    .pipe(browsriSync.stream());

    cb()
}

function htmlHandle(cb) {
    src('src/*.html')
        .pipe(dest('dest', { overwrite: true }))
        .pipe(browsriSync.stream());
    cb();
}

function cssHandle(cb) {
    src('./src/**/*.css')
        .pipe(css())
        .pipe(minifyCss())
        .pipe(dest('dest'))
        .pipe(browsriSync.stream());
    cb();
}

const watchOptions = {
    events: 'all',
    ignoreIntial: false
}

function watchFile() {
    browsriSync.init({
        server: {
            baseDir: 'dest',
            index: 'index.html'
        }
    })
    watch(
        'src/**/*.js',
        watchOptions,
        jsHandle,
    ).on('change', browsriSync.reload);

    watch(
        'src/*.html',
        watchOptions,
        htmlHandle,
    ).on('change', browsriSync.reload);

    watch(
        'src/**/*.css',
        watchOptions,
        cssHandle,
    ).on('change', browsriSync.reload);
}
exports.watch = watchFile;
exports.default = series(htmlHandle, cssHandle, jsHandle);