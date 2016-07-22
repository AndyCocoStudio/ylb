(function() {
    var login = {};
    var m = {
        init: function() {
            m.buildVue();
        },
        buildVue: function() {
            login = new Vue({
                el: "#login-main",
                data: login,
                methods: {
                    login: function() {
                        var loginData = {};
                        loginData.mobile = login.user;
                        loginData.captcha = login.pwd;
                        console.log(JSON.stringify(loginData));
                        $.ajax({
                            url: "/api/user/login",
                            type: "POST",
                            data: JSON.stringify(loginData)
                        }).done(function(d) {
                            $.ylbAjaxHandler(d, function () {
                                $.setID(d.data.sessionID);
                                //$.localStorageHandler("set", "flag", d.data.flag);
                                window.location.href = 'index.html'
                            })
                        })
                    }
                }
            });
        }
    };
    m.init();
})();