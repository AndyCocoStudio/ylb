(function () {
    var list = {
        mid: $.urlParam("mid"),
    };
    var m = {
        init: function () {
            m.getList();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/merchant/givingscore?mid=" + list.mid,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    list.orderlist = d.data;
                    m.buildVue();
                })
            });
        },
        buildVue: function () {
            list = new Vue({
                el: "#orderlist-main",
                data: list,
                methods: {

                }
            })
        }
    };
    m.init();
})();