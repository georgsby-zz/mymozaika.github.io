var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var browserSync = require("browser-sync").create();

var scssPath = {
    source: './assets/scss/*.scss',
    dist: './static/css',
    watch: './assets/scss/**'
}
var jsPath = {
    source: './assets/js/*.js',
    dist: './static/js'
}
var imagesPath = {
    source: './assets/img/**',
    dist: './static/img'
}
var staticPath = './static'
var assetsPath = './assets'

gulp.task('css:dev', function() {
    return gulp.src(scssPath.source)
        .pipe(sass().on('error', sass.logError))
        .pipe(plumber()) // Checks for errors
        .pipe(autoprefixer({
            browsers: [
                'Chrome >= 45', // Exact version number here is kinda arbitrary
                'Firefox ESR',
                'Edge >= 12',
                'Explorer >= 10',
                // Out of leniency, we prefix these 1 version further back than the official policy.
                'iOS >= 9',
                'Safari >= 9',
                // The following remain NOT officially supported, but we're lenient and include their prefixes to avoid severely breaking in them.
                'Android >= 4.4',
                'Opera >= 30'
            ]
        }))
        .pipe(gulp.dest(scssPath.dist))
        .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);

gulp.task('js:dev', function() {
    return gulp.src(jsPath.source)
        .pipe(gulp.dest(jsPath.dist));
});

gulp.task('copy:images', function() {
    return gulp.src(imagesPath.source)
        .pipe(gulp.dest(imagesPath.dist));
});

gulp.task('clean', function() {
    return gulp.src(staticPath)
        .pipe(clean());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
});


// Watch
gulp.task('watch', [
    'browser-sync', 'copy:images', 'css:dev', 'js:dev'
], function() {
    gulp.watch(imagesPath.source, ['copy:images']);
    gulp.watch(scssPath.watch, ['css:dev']);
    gulp.watch(jsPath.source, ['js:dev']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

process.on('SIGINT', function() {
    console.log('Caught Ctrl+C...');
    process.exit();
});