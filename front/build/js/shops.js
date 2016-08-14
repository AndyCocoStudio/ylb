(function () {
    var shops = {
        plist: [],
        clist: [],
        alist: [],
        pc: "",
        cc: "",
        ac: "",
        cp: 1,
        t: 0,
        sz: 6,
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
            var url = "/merchants?pc=" + shops.pc + "&cc=" + shops.cc + "&ac=" + shops.ac + "&cp=" + shops.cp + "&sz=" + shops.sz;
            $.when($.ajax({
                url: $.apiUrl + url,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    shops.list = d.data.merchants;
                    shops.t = d.data.totalCount;
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
                        shops.cp = 1;
                        shops.t = 0;
                        m.getShops();
                    },
                    showall: function () {
                        shops.pc = "";
                        shops.cc = "";
                        shops.ac = "";
                        m.getShops();
                    },
                    prev: function () {
                        if (shops.cp <= 1) {
                            return;
                        } else {
                            shops.cp = +shops.cp - 1;
                            m.getShops();
                        }
                    },
                    next: function () {
                        if (shops.cp >= Math.ceil(shops.t / shops.sz)) {
                            return;
                        } else {
                            shops.cp = +shops.cp + 1;
                            m.getShops();
                        }
                    },
                    jump: function () {
                        if (shops.cp >= Math.ceil(shops.t / shops.sz)) shops.cp = Math.ceil(shops.t / shops.sz);
                        if (shops.cp <= 1) shops.cp = 1;
                        m.getShops();
                    }
                }
            })
        }
    };
    m.init();
})();