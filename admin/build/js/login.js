(function () {
    var login = {};
    var m = {
        init: function () {
            m.buildVue();
            $(".op-header").hide();
        },
        buildVue: function () {
            login = new Vue({
                el: "#login-main",
                data: login,
                methods: {
                    login: function () {
                        var loginData = {};
                        loginData.userName = login.user;
                        loginData.password = login.pwd;
                        $.ajax({
                            url: $.apiUrl + "/staff/login",
                            type: "POST",
                            data: JSON.stringify(loginData)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.setID(d.data.sessionID);
                                console.log(d.data);
                                $.setRole(d.data.role);
                                 window.location.href = "index.html";
                            });
                        });
                    },
                    trylogin: function (e) {
                        if(e.keyCode==13){
                            login.login();
                        }
                    }
                }
            });
        }
    };
    m.init();
})();