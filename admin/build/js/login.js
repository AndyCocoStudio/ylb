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
                                switch (d.data.role) {
                                    case "Admin":
                                        window.location.href = "superadmin.html";
                                        break;
                                    case "Marketing":
                                        window.location.href = "product.html";
                                        break;
                                    case "FinancialAffairs":
                                        window.location.href = "transfers.html";
                                        break;
                                    case "CustomerService":
                                        window.location.href = "onlineorder.html";
                                        break;
                                    case "GeneralManager":
                                        window.location.href = "upgraderight.html";
                                        break;
                                    default:
                                        break;

                                }
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