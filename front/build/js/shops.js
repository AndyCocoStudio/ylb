(function () {
    var shops = {

    };
    var m = {
        init: function () {
            m.getShops();
        },
        getShops: function () {
            $.when($.ajax({
                url: $.apiUrl + "/merchants",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    shops.list = d.data.merchants;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            shops = new Vue({
                el: "#shops-main",
                data: shops,
                methods: {

                }
            })
        }
    };
    m.init();
})();