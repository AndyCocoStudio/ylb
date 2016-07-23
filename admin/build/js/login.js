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
                        loginData.userName = login.user;
                        loginData.password = login.pwd;
                        console.log(JSON.stringify(loginData));
                        $.ajax({
                            url: "/api/staff/login",
                            type: "POST",
                            data: JSON.stringify(loginData)
                        }).done(function(d) {
                            $.ylbAjaxHandler(d, function () {
                                $.setID(d.data.sessionID);
                                window.location.href = 'upgraderight.html'
                            })
                        })
                    }
                }
            });
        }
    };
    m.init();
})();