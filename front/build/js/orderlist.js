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
                url: $.apiUrl + "",
                type: "GET"
            })).done(function (d) {
                
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