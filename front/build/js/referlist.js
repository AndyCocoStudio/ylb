(function () {
    var refer = {

    };
    var m = {
        init: function () {
            m.getlist();
        },
        getlist: function () {
            $.when($.ajax({
                url: $.apiUrl + "/merchant/recommended",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    refer = d.data;
                    m.buildVue();
                });
            })
        },
        buildVue: function () {
            refer = new Vue({
                el: "#refer-main",
                data: refer,
                methods: {}
            });
        }
    };
    m.init();
})();