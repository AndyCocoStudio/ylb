(function () {
    var vlogin = {
        mobile: "",
        password: "",
        url: $.regexUrl() || "",
        sid: $.getID() || "",
        num: 60,
        counting: false,
        countdown: 0,
        npwd: false,
        cover: false,
        newpwd: {
            mobile: "",
            captcha: "",
            password: ""
        }
    };
    var m = {
        init: function () {
            m.pageJump();
        },
        pageJump: function () {
            if (vlogin.sid) {
                if (vlogin.url) window.location.href = vlogin.url;
                else window.location.href = "index.html";
            }
            m.buildVue();
        },
        buildVue: function () {
            vlogin = new Vue({
                el: "#login-main",
                data: vlogin,
                methods: {
                    login: function () {
                        if (vlogin.mobile) {
                            if (vlogin.mobile.length < 11) {
                                $.ylbAlert("手机号码位数不正确");
                            } else {
                                if (!$.checkIsMobileNumber(vlogin.mobile)) {
                                    $.ylbAlert("请输入正确手机号");
                                } else {
                                    $.ajax({
                                        url: $.apiUrl + '/user/login',
                                        type: 'POST',
                                        data: JSON.stringify({
                                            "mobile": vlogin.mobile,
                                            "captcha": vlogin.password
                                        })
                                    }).done(function (d) {
                                        $.ylbAjaxHandler(d, function () {
                                            $.setID(d.data.sessionID);
                                            $.localStorageHandler("set", "flag", d.data.flag);
                                            if (vlogin.url) window.location.href = vlogin.url;
                                            else window.location.href = "customer.html";
                                        })
                                    });
                                }
                            }
                        } else {
                            $.ylbAlert("请输入手机号码");
                        }
                    },
                    tologin: function (e) {
                        if (e.keyCode == 13) {
                            vlogin.login();
                        }
                    },
                    //获取验证码
                    getCode: function () {
                        if (vlogin.counting) {
                            return;
                        } else {
                            if (vlogin.mobile) {
                                if (vlogin.mobile.length < 11) {
                                    $.ylbAlert("手机号码位数不正确");
                                } else {
                                    if (!$.checkIsMobileNumber(vlogin.mobile)) {
                                        $.ylbAlert("请输入正确手机号");
                                    } else {
                                        vlogin.counting = true;
                                        $.ajax({
                                            url: $.apiUrl + "/captcha",
                                            type: "PUT",
                                            data: JSON.stringify({
                                                mobile: vlogin.mobile,
                                            })
                                        }).done(function (d) {
                                            $.ylbAjaxHandler(d, function () {
                                                $.ylbAlert("发送成功");
                                                vlogin.countdown = setInterval(m.countDown, 1000);
                                            });
                                        });
                                    }
                                }
                            } else {
                                $.ylbAlert("请输入手机号码");
                            }
                        }
                    },
                    getCode2: function () {
                        if (vlogin.counting) {
                            return;
                        } else {
                            if (vlogin.newpwd.mobile) {
                                if (vlogin.newpwd.mobile.length < 11) {
                                    $.ylbAlert("手机号码位数不正确");
                                } else {
                                    if (!$.checkIsMobileNumber(vlogin.newpwd.mobile)) {
                                        $.ylbAlert("请输入正确手机号");
                                    } else {
                                        vlogin.counting = true;
                                        $.ajax({
                                            url: $.apiUrl + "/captcha",
                                            type: "PUT",
                                            data: JSON.stringify({
                                                mobile: vlogin.newpwd.mobile,
                                            })
                                        }).done(function (d) {
                                            $.ylbAjaxHandler(d, function () {
                                                $.ylbAlert("发送成功");
                                                vlogin.countdown = setInterval(m.countDown, 1000);
                                            });
                                        });
                                    }
                                }
                            } else {
                                $.ylbAlert("请输入手机号码");
                            }
                        }
                    },
                    setpwd: function () {
                        if (vlogin.newpwd.mobile == "") {
                            $.ylbAlert("请输入手机号码");
                            return;
                        }
                        if (vlogin.newpwd.captcha == "") {
                            $.ylbAlert("请输入验证码");
                            return;
                        }
                        if (vlogin.newpwd.password == "") {
                            $.ylbAlert("请输入密码");
                            return;
                        }
                        $.ajax({
                            url: $.apiUrl + "/user/login/password/reset",
                            type: "POST",
                            data: JSON.stringify(vlogin.newpwd)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("设置成功，请重新登录");
                                vlogin.hideall();
                                vlogin.newpwd = {
                                    mobile: "",
                                    captcha: "",
                                    password: ""
                                };
                            })
                        });
                    },
                    hideall: function () {
                        this.npwd = false;
                        this.cover = false;
                    },
                    showforget: function () {
                        this.cover = true;
                        this.npwd = true;
                    }
                }
            })
        },
        countDown: function () {
            //## 再次获取验证码倒计时
            if (vlogin.num > 1) {
                vlogin.num -= 1;
                $(".btn-code, .a-code").val(vlogin.num + "秒后重新获取");
            } else {
                vlogin.counting = false;
                $(".btn-code").val("重新获取");
                vlogin.num = 60;
                clearInterval(vlogin.countdown);
            }
        }
    }
    m.init();
})();