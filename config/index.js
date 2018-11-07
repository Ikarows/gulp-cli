/*!
 * confing/index.js -https://github.com/Ikarows
 * Version - 1.0.0
 * author: Cosplay
 * time: 2018-04-11
 * Copyright (c) 2018 Daniel Eden
 */

const path = require('path')
const server = require('./server')

function resolveDev(dir) {
  return path.join(__dirname, '../src/', dir)
}

function resolveBuild(dir) {
  return path.join(__dirname, '../dist/', dir)
}

module.exports = {
  _src: "./src",
  _static: "./static",

  dev: {
    static: './static/**/*',
    html: [resolveDev('/**/*.html'), '!./src/components/**/*'],
    allhtml: resolveDev('/**/*.html'),
    less: resolveDev('static/styles/*.{less,css}'),
    sass: resolveDev('static/styles/*.{scss,css}'),
    script: resolveDev('static/js/**/*.js'),
    images: resolveDev('static/images/**/*.{png,jpg,gif,svg}'),
    sprite: resolveDev('static/sprite/**/*.{png,jpg,gif,svg}')
  },

  build: {
    static: resolveBuild('static'),
    html: resolveBuild(''),
    styles: resolveBuild('static/css'),
    script: resolveBuild('static/js'),
    images: resolveBuild('static/images'),
    sprite: '../../../static/css/'
  },

  zip: {
    name: 'dist.zip',
    path: resolveBuild('**/*'),
    dest: path.join(__dirname, '../')
  },

  server,
  useEslint: false,
  useWebpack: false,
  productionZip: false
}
