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