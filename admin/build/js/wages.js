(function () {
    var wages = {
        cp: 1,
        sz: 20,
        t: 0,
        y: new Date().getFullYear(),
        m: new Date().getMonth() == 0 ? 12 : new Date().getMonth(),
        cty: new Date().getFullYear(),
        ctm: new Date().getMonth() == 12 ? 1 : new Date().getMonth() + 1,
        role: "",
        pc: "",
        cc: "",
        ac: "",
        plist: [],
        clist: [],
        alist: []
    };
    var m = {
        init: function () {
            m.getpList();
        },
        getpList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/address",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    wages.plist = d.data;
                    m.getList();
                });
            });
        },
        updatecity: function (code) {
            $.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            }).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    wages.clist = d.data;
                });
            })
        },
        updatearea: function (code) {
            $.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            }).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    wages.alist = d.data;
                });
            })
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/wages?pc=" + wages.pc + "&cc=" + wages.cc + "&ac=" + wages.ac + "&cp=" + wages.cp + "&sz=" + wages.sz + "&y=" + wages.y + "&m=" + wages.m + "&r=" + wages.role,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    wages.list = d.data.wages;
                    wages.year = d.data.year;
                    wages.month = d.data.month;
                    wages.t = d.data.totalCount;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            wages = new Vue({
                el: "#wages-main",
                data: wages,
                methods: {
                    sendwage: function (id) {
                        $.ajax({
                            url: $.apiUrl + "/areamanager/wage",
                            type: "POST",
                            data: JSON.stringify({
                                userID: id
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("操作成功！");
                                m.getList();
                            })
                        });
                    },
                    changeprov: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        wages.pc = c;
                        wages.cc = "";
                        wages.ac = "";
                        wages.alist = [];
                        m.updatecity(c);
                    },
                    changecity: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        wages.cc = c;
                        wages.ac = "";
                        m.updatearea(c);
                    },
                    changearea: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        wages.ac = c;
                    },
                    changeyear: function (el) {
                        var v = $(el.target).find("option:selected").val();
                        wages.y = v;
                    },
                    changemonth: function (el) {
                        var v = $(el.target).find("option:selected").val();
                        wages.m = v;
                    },
                    changerole: function (el) {
                        var v = $(el.target).find("option:selected").val();
                        wages.role = v;
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
                    filterlist: function () {
                        m.getList();
                    }
                }
            })
        }
    };
    m.init()
})();