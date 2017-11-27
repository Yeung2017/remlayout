const gulp = require('gulp')
const del = require('del')
const uglify = require('gulp-uglify')
const eslint = require('gulp-eslint')

const outputdir = 'dist'

// 清楚先前部署
gulp.task('clean', function () {
  return del(outputdir + '/@(index.html|css|fonts|js|static|pages)')
})

// 对js进行代码检查
gulp.task('eslint', function () {
  return gulp
    .src(['src/**/*.js', '!src/static/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

// 处理js
gulp.task('scripts', gulp.series('eslint', function scriptsInternal () {
  return gulp.src([
    'src/**/*.js', '!src/static/**/*.js'
  ], {
    base: 'src'
  })
    .pipe(uglify({
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }))
    .pipe(gulp.dest(outputdir))
}))

gulp.task('default', gulp.series('clean', gulp.parallel('scripts'), function wathcer (done) {
  gulp.watch([
    'src/**/*.js', '!src/static/**/*.js'
  ], gulp.parallel('scripts'))
  done()
}))
