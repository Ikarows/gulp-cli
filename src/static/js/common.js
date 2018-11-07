/*!
 * common.js -http://www.xxx.com
 * Version - 1.0.0
 * author: xxx
 * date: xxx
 * Copyright (c) 2018 Daniel Eden
 */

new function () {
    var _self = this;
    _self.width = 750; //设置默认最大宽度
    _self.fontSize = 100; //默认字体大小
    _self.widthProportion = function () {
        var device_width = document.getElementsByTagName("html")[0].offsetWidth;
        var p = device_width / _self.width;
        return p;
    };
    _self.changePage = function () {
        var rem = _self.widthProportion() * _self.fontSize;
        document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + rem + "px !important");
    }
    _self.changePage();
    window.addEventListener("resize", function () {
        _self.changePage();
    }, false);
};

function getParamsFromURL(url) {
    if ('undefined' == url) {
        return {};
    }
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    for (var i = 0; i < paraString.length; i++) {
        var j = paraString[i];
        paraObj[j.substring(0, j.indexOf("="))] = j.substring(j.indexOf("=") + 1, j.length);
    }
    return paraObj;
}

var params = getParamsFromURL(window.location.href); // params.xxxx