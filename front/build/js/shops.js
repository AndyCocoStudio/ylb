(function () {
    var shops = {
        plist: [],
        clist: [],
        alist: [],
        pc: "",
        cc: "",
        ac: ""
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
        getShops: function () {
            var url = "/merchants?pc=" + shops.pc + "&cc=" + shops.cc + "&ac=" + shops.ac;
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
                        shops.pc = c;
                    },
                    selcity: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        shops.alist = [];
                        m.updatealist(c);
                        shops.cc = c;
                    },
                    selarea: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        shops.ac = c;
                    },
                    searchshops: function () {
                        //var p="";
                        m.getShops();
                    },
                    showall: function () {
                        shops.pc = "";
                        shops.cc = "";
                        shops.ac = "";
                        m.getShops();
                    }
                }
            })
        }
    };
    m.init();
})();