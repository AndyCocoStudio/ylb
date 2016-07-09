(function () {
    var vlogon = {
        mobile: "",
        password: "",
        ref: $.urlParam("rid")
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
                                $.localStorageHandler("set","flag",d.data.flag);
                                window.location.href = "index.html";
                            });
                        });
                    }
                }
            })
        }
    }
    m.init();
})();