(function () {
    var asset = {

    };
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
                    asset.user = d.data;
                    m.getAsset();
                });
            });
        },
        getAsset: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/asset",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    asset.detail = d.data;
                    m.getTransfer();
                });
            });
        },
        getTransfer: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/transfers",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    asset.transfer = d.data.transfers;
                    m.getRecharge();
                });
            });
        },
        getRecharge: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/recharges",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    asset.recharge = d.data.recharges;
                    if (asset.user.role == "Merchants" || asset.user.role == "AM" || asset.user.role == "CM") {
                        m.getCommission();
                    }
                    else {
                        m.buildVue();
                    }
                });
            })
        },
        getCommission: function () {
            $.when($.ajax({
                url: $.apiUrl + "/commissions?cp=1&sz=1000",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    asset.commission = d.data.commissions;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            asset = new Vue({
                el: "#asset-main",
                data: asset,
                methods: {

                }
            })
        }
    };
    m.init();
})();