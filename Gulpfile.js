const gulp = require('gulp');
const del = require('del');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const base64 = require('gulp-base64');
const less = require('gulp-less');
const csscomb = require('gulp-csscomb');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const bSync = require('browser-sync').create();

const outputdir = '.';

// 清楚先前部署
gulp.task('clean', function() {
	return del(outputdir + '/@(index.html|css|fonts|js|static|pages)');
});

// 对js进行代码检查
gulp.task('eslint', function() {
	return gulp
		.src(['src/**/*.js', '!src/static/**/*.js'])
		.pipe(eslint())
		.on('error', function(err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe(eslint.format())
		.on('error', function(err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe(eslint.failAfterError());
});

// 处理js
gulp.task('scripts', gulp.series('eslint', function scriptsInternal() {
	return gulp.src([
			'src/**/*.js', '!src/static/**/*.js'
		], {
			base: 'src'
		})
		.pipe(uglify({
			compress: {
//				drop_console: true,
				drop_debugger: true
			}
		}))
		.on('error', function(err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe(gulp.dest(outputdir));
}));

// 处理static资源
gulp.task('copy:static', function() {
	return gulp
		.src('src/static/**/*', {
			base: 'src'
		})
		.pipe(gulp.dest(outputdir));
});

// 处理样式
gulp.task('styles', function() {
	return gulp
		.src(['src/**/*.less', '!src/static/**/*.less', '!src/css/less/**/*.less'], {
			base: 'src'
		})
		.pipe(less())
		.on('error', function(err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe(base64({
			extensions: ['jpg', 'png'],
			maxImageSize: 10 * 1024
		}))
		.pipe(autoprefixer())
		.on('error', function(err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe(csscomb())
		.on('error', function(err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe(cssnano())
		.on('error', function(err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe(gulp.dest(outputdir));
});

// 处理图片
gulp.task('img', function() {
	return gulp
		.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif'], {
			base: 'src'
		})
		.pipe(gulp.dest(outputdir));
});


// 处理html文件
gulp.task('html', function() {
	return gulp
		.src('src/**/*.html', {
			base: 'src'
		})
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true
		}))
		.pipe(gulp.dest(outputdir));
});

// 启动服务器
gulp.task('server', function(done) {
	bSync.init({
		server: {
			baseDir: [outputdir]
		},
		port: 3006
	});
	done();
});

gulp.task('default', gulp.series('clean', gulp.parallel('styles', 'html', 'copy:static', 'scripts', 'img'), 'server', function wathcer(done) {
	gulp.watch([
		'src/**/*.js', '!src/static/**/*.js'
	], gulp.parallel('scripts'));
	gulp.watch(['src/**/*.less', '!src/static/**/*.less', '!src/css/less/**/*.less'], gulp.parallel('styles'));
	gulp.watch('src/**/*.html', gulp.parallel('html'));
	gulp.watch(['src/**/*.png','src/**/*.jpg','src/**/*.gif'], gulp.parallel('img'));
	gulp.watch(outputdir + '/**/*', bSync.reload);
	done();
}));