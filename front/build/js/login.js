(function () {
    var vlogin = {
        mobile: "",
        password: "",
        url: $.regexUrl() || "",
        sid: $.getID() || ""
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
                                else window.location.href = "index.html";
                            })
                        });
                    }
                }
            })
        }
    }
    m.init();
})();