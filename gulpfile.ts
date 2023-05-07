var gulp = require('gulp')
var ts = require('gulp-typescript')
var tsProject = ts.createProject('tsconfig.json')
var nodemon = require('nodemon')

gulp.task("default" , function(){
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
})

gulp.task('serve', ['watch'], function(){
    return nodemon({
      script: 'dist/index.js',
    })
    .on('restart', function(){
      console.log('restarted');
    })
  })