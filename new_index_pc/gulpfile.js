var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');  // 错误捕捉插件
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer')
var cleanCSS = require('gulp-clean-css')
var reload      = browserSync.reload;

var paths = {
	less: ['./less/*.less'],       //less文件夹，下所有的less文件
	js: ['./js/*.js'],
    html: ['./html/*.html']
	// js文件夹下、当前路径下所有的js文件
};

gulp.task('less', function () {
	return gulp.src('./less/*.less')    
	//将less文件夹下的style.less 转为style.css,放在assets文件夹下
	.pipe(plumber())
	.pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 4 versions', 'ie >= 8'],
      cascade: true,
      remove: true
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('./static/css/'))
	.pipe(reload({stream: true}));
});

gulp.task('scripts', function() {
  return gulp.src([
      './js/*.js',
      'main.js',
    ])
  	.pipe(plumber())
    .pipe(concat('main.min.js'))     
    //'main.min.js'为合并后的文件名. 使用gulp-concat合并javascript文件，减少网络请求。
    // 将components文件夹下、当前路径下所有的js文件合并为main.min.js，存在asset是文件夹下。
    .pipe(gulp.dest('./static/js/'))
	.pipe(reload({stream: true}));
});

// 静态服务器
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./",
			proxy: "localhost",
			port: 4000
        }
    });
    gulp.watch(paths.html).on('change',reload);
	gulp.watch(paths.less, ['less']);
	gulp.watch(paths.js, ['scripts']);
});