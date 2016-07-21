(function () {
    var asset = {

    };
    var m = {
        init: function () {
            m.getAsset();
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
                    asset.recharge=d.data.recharges;
                    m.buildVue();
                });
            })
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