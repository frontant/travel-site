var gulp = require("gulp");
var svgSprite = require("gulp-svg-sprite");
var rename = require("gulp-rename");
var del = require("del");
var svg2png = require("gulp-svg2png");
var gulpSequence = require("gulp-sequence");

var config = {
    shape: {
        spacing : {
            padding: 1
        }
    },
    mode : {
        css :{
            sprite : "sprite.svg",
            variables : {
                replaceSvgWithPng : function(){
                    return function(sprite, render){
                        return render(sprite).replace(/.svg$/, '.png');
                    };
                }
            },
            render : {
                css : {
                    template : "./gulp/templates/sprite.css"
                }
            }
        }
    }
}

gulp.task("beginClean", function(){
    return del(["./app/temp/sprite", "./app/assets/images/sprites"]);
});

gulp.task("createSprite", function(){
    return gulp.src("./app/assets/images/icons/**/*.svg")
    .pipe(svgSprite(config))
    .pipe(gulp.dest("./app/temp/sprite"));
});

gulp.task("createSpritePng", ["createSprite"], function(){
    return gulp.src("./app/temp/sprite/css/*.svg")
    .pipe(svg2png())
    .pipe(gulp.dest("./app/temp/sprite/css"));
})

gulp.task("copySpriteGraphic", ["createSprite", "createSpritePng"], function(){
    return gulp.src("./app/temp/sprite/css/**/*.{svg,png}")
    .pipe(gulp.dest("./app/assets/images/sprites"));
});

gulp.task("copySpriteCss", ["createSprite"], function(){
    return gulp.src("./app/temp/sprite/css/*.css")
    .pipe(rename("_sprite.css"))
    .pipe(gulp.dest("./app/assets/styles/modules"));
});

gulp.task("endClean", function(){
    return del(["./app/temp/sprite"]);
});

gulp.task("icons", gulpSequence(
    "beginClean",
    ["copySpriteGraphic", "copySpriteCss"],
    "endClean"
));