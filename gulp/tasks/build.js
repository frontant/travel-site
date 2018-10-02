var gulp = require("gulp"),
imagemin = require("gulp-imagemin"),
del = require("del"),
usemin = require("gulp-usemin"),
rev = require("gulp-rev"),
cssnano = require("gulp-cssnano"),
uglify = require("gulp-uglify"),
browserSync = require("browser-sync").create();

gulp.task("previewDist", function(){
    browserSync.init({
        notify: false,
//        ghostMode: false,
        localOnly: true,
        open: false,
        online: false,
        xip: false,
        tunnel: null,
        server:{
            baseDir: "dist"
        }
    });
});

gulp.task("deleteDistFolder", function(){
    return del("./dist");
});

gulp.task("copyGeneralFiles", ["deleteDistFolder"], function(){
    var pathsToCopy = [
        "./app/**/*",
        "!./app/index.html",
        "!./app/assets/images",
        "!./app/assets/images/**",
        "!./app/assets/styles",
        "!./app/assets/styles/**",
        "!./app/assets/scripts",
        "!./app/assets/scripts/**",
        "!./app/temp",
        "!./app/temp/**"
    ];

    return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./dist"))
});

gulp.task("optimiseImages", ["deleteDistFolder", "icons"], function(){
    return gulp.src([
        "./app/assets/images/**/*",
        "!./app/assets/images/**/icons",
        "!./app/assets/images/**/icons/**",
        "!./app/assets/images/**/*-i.{jpg,jpeg,png}"
    ])
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
    }))
    .pipe(gulp.dest("./dist/assets/images"))
});

gulp.task("usemin", ["deleteDistFolder", "styles", "scripts"], function(){
    return gulp.src("./app/index.html")
    .pipe(usemin({
        css: [
            rev,
            cssnano
        ],
        js: [
            rev,
            uglify
        ]
    }))
    .pipe(gulp.dest("./dist"));
});

gulp.task("build", [
    "deleteDistFolder",
    "copyGeneralFiles",
    "optimiseImages",
    "usemin"]);