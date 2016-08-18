(function () {
    var wages = {
        y: $.urlParam("y"),
        m: $.urlParam("m"),
        uid: $.urlParam("uid"),
        cp: 1,
        t: 0,
        sz: 20
    };
    var m = {
        init: function () {
            m.getList();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/wage/log?uid=" + wages.uid + "&y=" + wages.y + "&m=" + wages.m + "&cp=" + wages.cp + "&sz=" + wages.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    wages.list = d.data.wages;
                    wages.t = d.data.totalCount;
                    m.buildVue();
                })
            });
        },
        buildVue: function () {
            wages = new Vue({
                el: "#wagesinfo-main",
                data: wages,
                methods: {
                    filterlist: function () {
                        m.getList();
                    },
                    changeyear: function (el) {
                        var v = $(el.target).find("option:selected").val();
                        wages.y = v;
                    },
                    changemonth: function (el) {
                        var v = $(el.target).find("option:selected").val();
                        wages.m = v;
                    },
                    prev: function () {
                        if (wages.cp <= 1) {
                            return;
                        } else {
                            wages.cp = +wages.cp - 1;
                            m.getList();
                        }
                    },
                    next: function () {
                        if (wages.cp >= Math.ceil(wages.t / wages.sz)) {
                            return;
                        } else {
                            wages.cp = +wages.cp + 1;
                            m.getList();
                        }
                    },
                    jump: function () {
                        if (wages.cp >= Math.ceil(wages.t / wages.sz)) wages.cp = Math.ceil(wages.t / wages.sz);
                        if (wages.cp <= 1) wages.cp = 1;
                        m.getList();
                    },
                }
            })
        }
    };
    m.init();
})();