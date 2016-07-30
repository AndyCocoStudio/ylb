(function () {
    online = {};
    var m = {
        init: function () {
            m.getList();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/orders?k=2",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    online.list = d.data.orders;
                    m.buildVue();
                });
            })
        },
    };
    m.init();
})();