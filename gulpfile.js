"use strict";

const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const gulp = require("gulp");
const gulpConcat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");

function makeCss() {
    return gulp.src(["./scss/base.scss", "./scss/**/*.scss"])
        .pipe(gulpConcat("style.css"))
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulp.dest("./css"));
}

exports.makeCss = makeCss;
exports.watch = function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./scss/**/*.scss", makeCss);
    gulp.watch("./").on("change", browserSync.reload);
};
