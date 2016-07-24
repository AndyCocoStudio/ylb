(function () {
    var order = {
        filter: {},
        plist: [],
        clist: [],
        alist: [],
        pc: "",
        cc: "",
        ac: "",
        st: "",
        et: ""
    };
    var m = {
        init: function () {
            m.getList();
            m.resetDate();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/statistics/givingscore",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    order.list = d.data;
                    m.getplist();
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
                    m.buildVue();
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
                        var param = "pc=" + order.pc + "&cc=" + order.cc + "&ac=" + order.ac + "&st=" + order.st + "&et=" + order.et;
                        $.ajax({
                            url: $.apiUrl + "/statistics/givingscore?" + param,
                            type: "GET"
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                order.list = d.data;
                            });
                        });
                    }
                }
            });
        }
    };
    m.init();
})();