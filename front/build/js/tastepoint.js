(function () {
    var taste = {

    };
    var m = {
        init: function () {
            m.getCount();
        },
        getCount: function () {
            $.when($.ajax({
                url: $.apiUrl + "/mine/places",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.count = d.data;
                    m.getInfo();
                });
            })
        },
        getInfo: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/abstract",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.user = d.data;
                    switch (d.data.role) {
                        case "Merchants":
                            m.merchants();
                            break;
                        case "CustomerManager":
                            m.customerManager();
                            break;
                        case "AreaManager":
                            m.areaManager();
                            break;
                        case "CM":
                            m.cm();
                            break;
                        case "AM":
                            m.am();
                            break;
                        default:
                            alert("您是普通会员，没有赠送体验积分权限");
                            window.location.href = "customer.html";
                            break;
                    }
                });
            });
        },
        merchants: function () {
            $.when($.ajax({
                url: $.apiUrl + "/merchant/users",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.list = d.data.users;
                    m.buildVue();
                });
            });
        },
        customerManager: function () {
            $.when($.ajax({
                url: $.apiUrl + "/customermanager/merchants",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.list = d.data.merchants;
                    m.buildVue();
                });
            });
        },
        areaManager: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/customermanager",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.list = d.data.customers;
                    m.buildVue();
                });
            });
        },
        am: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/customermanager",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.list = d.data.customers;
                    m.buildVue();
                });
            });
        },
        cm: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/customermanager",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.list = d.data.customers;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            taste = new Vue({
                el: "#taste-main",
                data: taste,
                methods: {
                    
                }
            })
        }
    };
    m.init()
})();