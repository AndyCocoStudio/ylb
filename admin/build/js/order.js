(function () {
    var order = {
        plist: [],
        clist: [],
        alist: [],
        pc: "",
        cc: "",
        ac: "",
        st: "",
        et: "",
        t: 0,
        cp: 1,
        sz: 12,
    };
    var m = {
        init: function () {
            m.getplist();
            m.resetDate();
        },
        getList: function () {
            var param = "cp=" + order.cp + "&sz=" + order.sz + "&pc=" + order.pc + "&cc=" + order.cc + "&ac=" + order.ac + "&st=" + order.st + "&et=" + order.et;
            $.when($.ajax({
                url: $.apiUrl + "/statistics/givingscore?" + param,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    order.list = d.data;
                    order.t = d.data.totalCount;
                    m.buildVue();
                });
            });
        },
        getplist: function () {
            $.when($.ajax({
                url: $.apiUrl + "/address",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    order.plist = d.data;
                    m.getList();
                });
            })
        },
        updatecity: function (code) {
            $.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            }).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    order.clist = d.data;
                });
            })
        },
        updatearea: function (code) {
            $.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            }).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    order.alist = d.data;
                });
            })
        },
        resetDate: function () {
            var std = new Pikaday({
                field: document.getElementById('std'),
                firstDay: 1,
                minDate: new Date('2016-07-01'),
                maxDate: new Date('3020-12-31'),
                yearRange: [2016, 3020]
            });
            var etd = new Pikaday({
                field: document.getElementById('etd'),
                firstDay: 1,
                minDate: new Date('2016-07-01'),
                maxDate: new Date('3020-12-31'),
                yearRange: [2016, 3020]
            });
        },
        buildVue: function () {
            order = new Vue({
                el: "#order-main",
                data: order,
                methods: {
                    setprov: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        order.pc = c;
                        order.cc = "";
                        order.ac = "";
                        order.alist = [];
                        m.updatecity(c);
                    },
                    setcity: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        order.cc = c;
                        order.ac = "";
                        m.updatearea(c);
                    },
                    setarea: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        order.ac = c;
                    },
                    filterorder: function () {
                        order.cp = 1;
                        m.getList();
                    },
                    prev: function () {
                        if (order.cp <= 1) {
                            return;
                        } else {
                            order.cp = +order.cp - 1;
                            m.getList();
                        }
                    },
                    next: function () {
                        if (order.cp >= Math.ceil(order.t / order.sz)) {
                            return;
                        } else {
                            order.cp = +order.cp + 1;
                            m.getList();
                        }
                    },
                    jump: function () {
                        if (order.cp >= Math.ceil(order.t / order.sz)) order.cp = Math.ceil(order.t / order.sz);
                        if (order.cp <= 1) order.cp = 1;
                        m.getList();
                    },
                }
            });
            setTimeout(function () {
                $.setLeftBar("order");
            }, 100);
        }
    };
    m.init();
})();