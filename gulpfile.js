/*!
 * gulpfile.js -https://github.com/Ikarows
 * Version - 1.0.0
 * author: Cosplay
 * time: 2018-04-11
 * Copyright (c) 2018 Daniel Eden
 */

const config = require('./config')
$ = require('gulp-load-plugins')()

const path = require('path')
const chalk = require('chalk')
const gulp = require('gulp')
const pngquant = require('imagemin-pngquant')
const del = require('del')

// webpack
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')

// server
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

// NODE_ENV
const env = process.env.NODE_ENV || 'development'
const condition = env === 'production'

function respath(dir) {
  return path.join(__dirname, './', dir)
}

function onError(error) {
  const title = error.plugin + ' ' + error.name
  const msg = error.message
  const errContent = msg.replace(/\n/g, '\\A ')

  $.notify.onError({
    title: title,
    message: errContent,
    sound: true
  })(error)

  this.emit('end')
}

function cbTask(task) {
  return new Promise((resolve, reject) => {
    del(respath('dist'))
      .then(paths => {
        console.log(chalk.green(`
      -----------------------------
        Clean tasks are completed
      -----------------------------`))
        $.sequence(task, () => {
          console.log(chalk.green(`
        -----------------------------
          All tasks are completed
        -----------------------------`))
          resolve('completed')
        })
      })
  })
}

gulp.task('html', () => {
  return gulp.src(config.dev.html)
    .pipe($.plumber(onError))
    /*.pipe($.fileInclude({
      prefix: '@@',
      basepath: respath('src/include/')
    }))*/
    .pipe($.ejs({})) //编译ejs
    .pipe($.useref()) //前台加相关代码后可以合并css和js成统一文件

    //格式化(美化) html
    .pipe($.htmlBeautify({
        indent_size: 4,
        indent_char: ' ',
        // 这里是关键，可以让一个标签独占一行
        unformatted: true,
        // 默认情况下，body | head 标签前会有一行空格
        extra_liners: []
    }))

    //压缩html
    .pipe($.if(condition, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true
    })))

    .pipe(gulp.dest(config.build.html))
})

gulp.task('less', () => {
  return gulp.src(config.dev.less)
    .pipe($.plumber(onError))
    .pipe($.less())
    .pipe($.if(condition, $.cleanCss({ debug: true })))
    .pipe($.postcss('./.postcssrc.js'))
    .pipe(gulp.dest(config.build.styles))
})

gulp.task('sass', () => {
  return gulp.src(config.dev.sass)
    .pipe($.plumber(onError))
    .pipe($.sass())
    .pipe($.if(condition, $.cleanCss({ debug: true })))
    .pipe($.postcss('./.postcssrc.js'))
    .pipe(gulp.dest(config.build.styles))
})

gulp.task('styles', () => {
	gulp.start(['less','sass'])
})

gulp.task('images', () => {
  return gulp.src(config.dev.images)
    .pipe($.plumber(onError))
    .pipe($.cache($.imagemin({
      progressive: true, // 无损压缩JPG图片
      svgoPlugins: [{ removeViewBox: false }], // 不移除svg的viewbox属性
      use: [pngquant()] // 使用pngquant插件进行深度压缩
    })))
    .pipe(gulp.dest(config.build.images))
})

gulp.task('sprite', () => {
  return gulp.src(config.dev.sprite)
    .pipe($.plumber(onError))
    .pipe($.spritesmith({  
        imgName:   'sprite.png',
        cssName:   config.build.sprite + 'sprite.css',
        padding: 5,
        //algorithm:'binary-tree'
    }))
    .pipe(gulp.dest(config.build.images))
})

gulp.task('eslint', () => {
  return gulp.src(config.dev.script)
    .pipe($.plumber(onError))
    .pipe($.if(condition, $.stripDebug()))
    .pipe($.eslint({ configFle: './.eslintrc' }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
})


const useEslint = config.useEslint ? ['eslint'] : [];
gulp.task('script', useEslint, () => {
  return gulp.src(config.dev.script)
    .pipe($.plumber(onError))
    .pipe($.if(condition, $.babel({
      presets: ['env']
    })))
    .pipe($.if(config.useWebpack, webpackStream(webpackConfig, webpack)))
    .pipe($.if(condition, $.uglify()))
    .pipe(gulp.dest(config.build.script))
})

gulp.task('static', () => {
  return gulp.src(config.dev.static)
    .pipe(gulp.dest(config.build.static))
})

gulp.task('clean', () => {
  del('./dist').then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
})

gulp.task('watch', () => {
  gulp.watch(config.dev.allhtml, ['html']).on('change', reload)
  gulp.watch([config.dev.less, config.dev.sass], ['styles']).on('change', reload)
  gulp.watch(config.dev.script, ['script']).on('change', reload)
  gulp.watch(config.dev.images, ['images']).on('change', reload)
  gulp.watch(config.dev.sprite, ['sprite']).on('change', reload)
  gulp.watch(config.dev.static, ['static']).on('change', reload)
})

gulp.task('zip', () => {
  return gulp.src(config.zip.path)
    .pipe($.plumber(onError))
    .pipe($.zip(config.zip.name))
    .pipe(gulp.dest(config.zip.dest))
})

gulp.task('server', () => {
  const task = ['html', 'styles', 'script', 'sprite', 'images', 'static']
  cbTask(task).then(() => {
    browserSync.init(config.server)
    console.log(chalk.cyan('  Server complete.\n'))
    gulp.start('watch')
  })
})

gulp.task('build', () => {
  const task = ['html', 'styles', 'script', 'sprite', 'images', 'static']
  cbTask(task).then(() => {
    console.log(chalk.cyan('  Build complete.\n'))

    if (config.productionZip) {
      gulp.start('zip', () => {
        console.log(chalk.cyan('  Zip complete.\n'))
      })
    }
  })
})

gulp.task('default', () => {
  console.log(chalk.green(
    `
  Build Setup
    开发环境： npm run dev
    生产环境： npm run build
    打包压缩： npm run zip
    编译页面： gulp html
    编译脚本： gulp script
    编译样式： gulp styles
    语法检测： gulp eslint
    压缩图片： gulp images
    合雪碧图： gulp sprite
    `
  ))
})
