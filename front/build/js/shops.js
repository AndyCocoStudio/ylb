(function () {
    var shops = {
        plist: [],
        clist: [],
        alist: []
    };
    var m = {
        init: function () {
            m.getShops();
            m.getplist();
        },
        getplist: function () {
            $.when($.ajax({
                url: $.apiUrl + "/address",
                type: "GET"
            })).done(function (d) {
                shops.plist = d.data;
            });
        },
        getShops: function (ac) {
            var url = "";
            if (ac) url = "/merchants?ac=" + ac;
            else url = "/merchants";
            $.when($.ajax({
                url: $.apiUrl + url,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    shops.list = d.data.merchants;
                    m.buildVue();
                });
            });
        },
        updateclist: function (c) {
            $.ajax({
                url: $.apiUrl + "/address?code=" + c,
                type: "GET"
            }).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    shops.clist = d.data;
                });
            })
        },
        updatealist: function (c) {
            $.ajax({
                url: $.apiUrl + "/address?code=" + c,
                type: "GET"
            }).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    shops.alist = d.data;
                });
            })
        },
        buildVue: function () {
            shops = new Vue({
                el: "#shops-main",
                data: shops,
                methods: {
                    selprov: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        shops.alist = [];
                        m.updateclist(c);
                        shops.ac = "";
                    },
                    selcity: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        shops.alist = [];
                        m.updatealist(c);
                        shops.ac = "";
                    },
                    selarea: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        shops.ac = c;
                    },
                    searchshops: function () {
                        m.getShops(shops.ac);
                    }
                }
            })
        }
    };
    m.init();
})();