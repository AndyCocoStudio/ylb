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
                    refer.list = d.data;
                    m.getInfo();
                });
            });
        },
        getInfo: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/abstract",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    if (d.data.role == "CustomerManager" || d.data.role == "CM") m.getmlist();
                    else m.buildVue();
                });
            });
        },
        getmlist: function () {
            $.when($.ajax({
                url: $.apiUrl + "",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    refer.mlist = d.data;
                    m.buildVue();
                });
            });
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