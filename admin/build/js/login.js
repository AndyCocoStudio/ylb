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
                                $.setRole(d.data.role);
                                 window.location.href = "index.html";
                                // switch (d.data.role) {
                                //     case "Admin":
                                //         window.location.href = "cashpool.html";//超管
                                //         break;
                                //     case "Marketing":
                                //         window.location.href = "product.html";//市场scb
                                //         break;
                                //     case "FinancialAffairs":
                                //         window.location.href = "transfers.html";//财务cwb
                                //         break;
                                //     case "CustomerService":
                                //         window.location.href = "onlineorder.html";//网购部wgb
                                //         break;
                                //     case "GeneralManager":
                                //         window.location.href = "upgraderight.html";//总经理zjl
                                //         break;
                                //     default:
                                //         break;

                                // }
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