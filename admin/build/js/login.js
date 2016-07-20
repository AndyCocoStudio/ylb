(function () {
    var login = {
        mobile: "",
        password: ""
    };
    var m = {
        init: function () {
            m.buildVue();
        },
        buildVue: function () {
            login = new Vue({
                el: "#login-main",
                data: login,
                methods: {
                    login: function () {
                        $.ajax({
                            url: "/api/staff/login",
                            contentType: "application/json; charset=utf-8",
                            type: "POST",
                            data: JSON.stringify({
                                mobile: login.mobile,
                                password: login.password
                            })
                        }).done(function (d) {
                            
                        })
                    }
                }
            });
        }
    };
    m.init();
})();