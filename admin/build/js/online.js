(function () {
    online = {};
    var m = {
        init: function () {
            m.getList();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/order/shoppingonline",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    online.list = d.data.orders;
                    m.buildVue();
                });
            })
        },
        buildVue: function () {
            online = new Vue({
                el: "#online-main",
                data: online,
                methods: {

                }
            })
        }
    };
    m.init();
})();