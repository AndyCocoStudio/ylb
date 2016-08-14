(function () {
    var list = {
        cp: 1,
        sz: 20,
        t: 0,
        mid: $.urlParam("mid"),
    };
    var m = {
        init: function () {
            m.getList();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/merchant/givingscore?mid=" + list.mid + "&cp=" + list.cp + "&sz=" + list.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    list.orderlist = d.data;
                    list.t = d.data.totalCount;
                    m.buildVue();
                })
            });
        },
        buildVue: function () {
            list = new Vue({
                el: "#orderlist-main",
                data: list,
                methods: {
                    prev: function () {
                        if (list.cp <= 1) {
                            return;
                        } else {
                            list.cp = +list.cp - 1;
                            m.getList();
                        }
                    },
                    next: function () {
                        if (list.cp >= Math.ceil(list.t / list.sz)) {
                            return;
                        } else {
                            list.cp = +list.cp + 1;
                            m.getList();
                        }
                    },
                    jump: function () {
                        if (list.cp >= Math.ceil(list.t / list.sz)) list.cp = Math.ceil(list.t / list.sz);
                        if (list.cp <= 1) list.cp = 1;
                        m.getList();
                    },
                }
            })
        }
    };
    m.init();
})();