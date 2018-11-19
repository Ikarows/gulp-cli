
class libs {
    constructor() {

    }

    //动态设置字体大小
    setFontSize() {
        let _self = this;
        _self.width = 750; //设置默认最大宽度
        _self.fontSize = 100; //默认字体大小
        _self.widthProportion = function () {
            let device_width = document.getElementsByTagName("html")[0].offsetWidth;
            let p = device_width / _self.width;
            return p;
        };
        _self.changePage = function () {
            let rem = _self.widthProportion() * _self.fontSize;
            document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + rem + "px !important");
        }
        _self.changePage();
        window.addEventListener("resize", function () {
            _self.changePage();
        }, false);
    }

    //获取url参数
    urlParams() {
        let url = window.location.href;
        if ('undefined' == url) {
            return {};
        }
        let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        let paraObj = {};
        for (let i = 0; i < paraString.length; i++) {
            let j = paraString[i];
            paraObj[j.substring(0, j.indexOf("="))] = j.substring(j.indexOf("=") + 1, j.length);
        }
        return paraObj;
    }

    //倒计时
    countdown(startTime = "2018/11/18 01:30:58", endTime = "2019/11/18 01:31:00") {
        let time_now_server, time_now_client, time_end, time_server_client;
        time_end = new Date(endTime); //结束的时间  
        time_end = time_end.getTime();
        time_now_server = new Date(startTime); //开始的时间  
        time_now_server = time_now_server.getTime();
        time_now_client = new Date();
        time_now_client = time_now_client.getTime();
        time_server_client = time_now_server - time_now_client;

        setTimeout(() => {
            showTime()
        });

        let showTime = () => {
            let time_now, time_distance, str_time;
            let int_day, int_hour, int_minute, int_second;
            time_now = new Date();
            time_now = time_now.getTime() + time_server_client;
            time_distance = time_end - time_now;
            if (time_distance > 0) {
                int_day = Math.floor(time_distance / 86400000)
                time_distance -= int_day * 86400000;
                int_hour = Math.floor(time_distance / 3600000)
                time_distance -= int_hour * 3600000;
                int_minute = Math.floor(time_distance / 60000)
                time_distance -= int_minute * 60000;
                int_second = Math.floor(time_distance / 1000)
                if (int_hour < 10)
                    int_hour = "0" + int_hour;
                if (int_minute < 10)
                    int_minute = "0" + int_minute;
                if (int_second < 10)
                    int_second = "0" + int_second;
                str_time = int_day + "天" + int_hour + "小时" + int_minute + "分钟" + int_second + "秒";

                setTimeout(() => {
                    showTime()
                }, 1000);
                return str_time;
            }
        }
    }

    //判断浏览器设备
    browser() {
        let browser = {
            versions: function () {
                let u = navigator.userAgent, app = navigator.appVersion;
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                    weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                    qq: u.match(/\sQQ/i) == " qq" //是否QQ
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }

        //判断是否IE内核
        if (browser.versions.trident) { /*console.log("is IE");*/ }
        //判断是否webKit内核
        if (browser.versions.webKit) { /*console.log("is webKit");*/ }
        //判断是否移动端
        if (browser.versions.mobile || browser.versions.android || browser.versions.ios) { /*console.log("移动端");*/ }

        //检测浏览器语言
        let currentLang = navigator.language; //判断除IE外其他浏览器使用语言
        if (!currentLang) {//判断IE浏览器使用语言
            currentLang = navigator.browserLanguage;
        }
        //console.log(currentLang);

        //console.log(browser)
        return browser;
    }

    //返回顶部
    backTop(elm, time = 400) {
        if (!elm) {
            return;
        }
        //返回顶部
        $(window).scroll(function () {
            if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
                //if($(document).scrollTop() >= $(window).height()){
                $(elm).fadeIn();
            } else {
                $(elm).fadeOut();
            }
        });
        $(elm).on('click', function () {
            $('body,html').animate({ scrollTop: 0 }, time);
        });
    }
}


class request {
    init(type, url, params) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                type: type,
                url: url,
                data: params,
                dataType: "json",
                beforeSend: function (request) {
                    if(sessionStorage.token){
                        request.setRequestHeader("Auth-Token", sessionStorage.token);
                    }
                },
                success: function (res) {
                    resolve(res);
                    /*if (res.code === 1) {
                        
                    }else if(res.code === 2){
                        layer.open({
                            content: "登录信息失效，请退出重新登录。",
                            skin: 'msg',
                            shadeClose: false
                        });
                    }else{
                        layer.open({
                            content: `error code ${res.code}`,
                            skin: 'msg',
                            shadeClose: false
                        });
                    }*/
                },
                error: function (error) {
                    reject(error);
                    /*layer.open({
                        content: "请求失败，请重试！",
                        skin: 'msg',
                        time: 2
                    });*/
                }
            });
        });
    }

    get(url, parmas) {
        return this.init("GET", url, parmas);
    }

    post(url, parmas) {
        return this.init("POST", url, parmas);
    }
}

let lib = new libs();
let url = lib.urlParams();
let ajax = new request();

export { lib, url, ajax }