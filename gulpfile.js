var gulp = require('gulp'); //Подключаем Gulp
var sass = require('gulp-sass'); //Подключаем Sass пакет
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();

var minify = require("gulp-csso");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var htmlmin = require("gulp-htmlmin");
var rename = require("gulp-rename");
var run = require("run-sequence");
var del = require("del");

gulp.task("clean", function () {
  return del("build");
});

gulp.task('style', function() {
  gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"))
});

gulp.task("script", function () {
  return gulp.src("source/js/*.js")
    //.pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });


  gulp.watch('source/sass/**/*.{scss,sass}', ['style']);
  gulp.watch('source/*.html'), ['html'];
  gulp.watch('source/js/**/*.js', ['script']);
});

//  gulp.watch('source/sass/**/*.{scss,sass}', ['style']);
//  gulp.watch('source/*.html').on('change', server.reload);
//});

gulp.task("build", function (done) {
  run(
    "clean",
    "style",
    "images",
    "html",
    "script",
    done
  );
});
