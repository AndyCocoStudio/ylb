(function () {
    var pay = {
        id: $.urlParam("oid")
    };
    var m = {
        init: function () {
            m.getOrder();
        },
        getOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/bill?oid=" + pay.id,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    pay.order = d.data;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            pay = new Vue({
                el: "#pay-main",
                data: pay,
                methods: {

                }
            })
        }
    };
    m.init();
})();