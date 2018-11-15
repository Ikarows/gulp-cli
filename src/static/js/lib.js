
class libs {
    constructor() {
        
    }

    //动态设置字体大小
    setFontSize() {
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
    }

    //获取url参数
    url() {
        let url = window.location.href;
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
}

let lib = new libs();
let url = lib.url();

export {lib, url};