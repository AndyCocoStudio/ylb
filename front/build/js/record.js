(function () {
    var record = {};
    var m = {
        init: function () {
            m.getUserInfo();
        },
        getUserInfo: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/abstract",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    record.user = d.data;
                    if (d.data.role == "AreaManager" || d.data.role == "AM") {
                        m.getAMerchant();
                    } else {
                        m.getCMerchant();
                    }
                });
            });
        },
        getAMerchant: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/merchants?cp=1&sz=1000",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    record.ml = d.data.merchants;
                    m.getCustomer();
                });
            });
        },
        getCMerchant: function () {
            $.when($.ajax({
                url: $.apiUrl + "/customermanager/merchants?cp=1&sz=1000",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    record.ml = d.data.merchants;
                    m.buildVue();
                });
            });
        },
        getCustomer: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/customermanager?cp=1&sz=1000",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    record.cm = d.data.customerManagers;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            record = new Vue({
                el: "#record-main",
                data: record,
                methods: {

                }
            })
        }
    };
    m.init();
})();