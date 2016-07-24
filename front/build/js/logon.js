(function () {
    var vlogon = {
        mobile: "",
        password: "",
        ref: $.urlParam("rid"),
        url: $.regexUrl() || "",
        num: 60,
        counting: false,
        countdown: 0
    };
    var m = {
        init: function () {
            m.buildVue();
        },
        buildVue: function () {
            vlogon = new Vue({
                el: "#logon-main",
                data: vlogon,
                methods: {
                    logon: function () {
                        if (vlogon.mobile) {
                            if (vlogon.mobile.length < 11) {
                                $.ylbAlert("手机号码位数不正确");
                            } else {
                                if (!$.checkIsMobileNumber(vlogon.mobile)) {
                                    $.ylbAlert("请输入正确手机号");
                                } else {
                                    $.ajax({
                                        url: $.apiUrl + '/user/register',
                                        type: 'PUT',
                                        data: JSON.stringify({
                                            "mobile": vlogon.mobile,
                                            "captcha": vlogon.password,
                                            "referrerMobile": vlogon.ref
                                        })
                                    }).done(function (d) {
                                        $.ylbAjaxHandler(d, function () {
                                            $.setID(d.data.sessionID);
                                            $.localStorageHandler("set", "flag", d.data.flag);
                                            window.location.href = "index.html";
                                        });
                                    });
                                }
                            }
                        } else {
                            $.ylbAlert("请输入手机号码");
                        }
                    },
                    getCode: function () {
                        if (vlogon.counting) {
                            return;
                        } else {
                            if (vlogon.mobile) {
                                if (vlogon.mobile.length < 11) {
                                    $.ylbAlert("手机号码位数不正确");
                                } else {
                                    if (!$.checkIsMobileNumber(vlogon.mobile)) {
                                        $.ylbAlert("请输入正确手机号");
                                    } else {
                                        vlogon.counting = true;
                                        $.ajax({
                                            url: $.apiUrl + "/captcha",
                                            type: "PUT",
                                            data: JSON.stringify({
                                                mobile: vlogon.mobile,
                                            })
                                        }).done(function (d) {
                                            $.ylbAjaxHandler(d, function () {
                                                $.ylbAlert("发送成功");
                                                vlogon.countdown = setInterval(m.countDown, 1000);
                                            });
                                        });
                                    }
                                }
                            } else {
                                $.ylbAlert("请输入手机号码");
                            }
                        }
                    }
                }
            })
        },
        countDown: function () {
            //## 再次获取验证码倒计时
            if (vlogon.num > 1) {
                vlogon.num -= 1;
                $(".btn-code").val(vlogon.num + "秒后重新获取");
            } else {
                vlogon.counting = false;
                $(".btn-code").val("重新获取");
                vlogon.num = 60;
                clearInterval(vlogon.countdown);
            }
        }
    }
    m.init();
})();