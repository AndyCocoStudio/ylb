(function () {
    var refer = {
        sz: 20,
        t: 0,
        cp: 1,
        mt: 0,
        mcp: 1
    };
    var m = {
        init: function () {
            m.getlist();
        },
        getlist: function () {
            $.when($.ajax({
                url: $.apiUrl + "/merchant/users?cp=" + refer.cp + "&sz=" + refer.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    refer.list = d.data;
                    refer.t = d.data.totalCount;
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
                url: $.apiUrl + "/customermanager/merchants?cp=" + refer.cp + "&sz=" + refer.sz,
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
                methods: {
                    prev: function () {
                        if (refer.cp <= 1) {
                            return;
                        } else {
                            refer.cp = +refer.cp - 1;
                            m.getlist();
                        }
                    },
                    next: function () {
                        if (refer.cp >= Math.ceil(refer.t / refer.sz)) {
                            return;
                        } else {
                            refer.cp = +refer.cp + 1;
                            m.getlist();
                        }
                    },
                    jump: function () {
                        if (refer.cp >= Math.ceil(refer.t / refer.sz)) refer.cp = Math.ceil(refer.t / refer.sz);
                        if (refer.cp <= 1) refer.cp = 1;
                        m.getlist();
                    },
                    mprev: function () {
                        if (refer.mcp <= 1) {
                            return;
                        } else {
                            refer.mcp = +refer.mcp - 1;
                            m.getmlist();
                        }
                    },
                    mnext: function () {
                        if (refer.mcp >= Math.ceil(refer.mt / refer.sz)) {
                            return;
                        } else {
                            refer.mcp = +refer.mcp + 1;
                            m.getmlist();
                        }
                    },
                    mjump: function () {
                        if (refer.mcp >= Math.ceil(refer.mt / refer.sz)) refer.mcp = Math.ceil(refer.mt / refer.sz);
                        if (refer.mcp <= 1) refer.mcp = 1;
                        m.getmlist();
                    }
                }
            });
        }
    };
    m.init();
})();