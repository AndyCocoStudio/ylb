(function () {
    var users = {
        pc: "",
        cc: "",
        ac: "",
        plist: [],
        clist: [],
        alist: [],
        cp: 1,
        sz: 20,
        t: 0
    };
    var m = {
        init: function () {
            m.getUserList();
            m.getplist();
        },
        getplist: function () {
            $.when($.ajax({
                url: $.apiUrl + "/address",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    users.plist = d.data;
                });
            });
        },
        updatecity: function (code) {
            $.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            }).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    users.clist = d.data;
                });
            })
        },
        updatearea: function (code) {
            $.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            }).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    users.alist = d.data;
                });
            })
        },
        getUserList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/statistics/users?pc=" + users.pc + "&cc=" + users.cc + "&ac=" + users.ac + "&cp=" + users.cp + "&sz=" + users.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    users.info = d.data;
                    users.t = d.data.totalCount;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            users = new Vue({
                el: "#users-main",
                data: users,
                methods: {
                    changeprov: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        users.pc = c;
                        users.cc = "";
                        users.ac = "";
                        users.alist = [];
                        m.updatecity(c);
                    },
                    changecity: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        users.cc = c;
                        users.ac = "";
                        m.updatearea(c);
                    },
                    changearea: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        users.ac = c;
                    },
                    filteruser: function () {
                        users.cp = 1;
                        m.getUserList();
                    },
                    prev: function () {
                        if (users.cp <= 1) {
                            return;
                        } else {
                            users.cp = +users.cp - 1;
                            m.getUserList();
                        }
                    },
                    next: function () {
                        if (users.cp >= Math.ceil(users.t / users.sz)) {
                            return;
                        } else {
                            users.cp = +users.cp + 1;
                            m.getUserList();
                        }
                    },
                    jump: function () {
                        if (users.cp >= Math.ceil(users.t / users.sz)) users.cp = Math.ceil(users.t / users.sz);
                        if (users.cp <= 1) users.cp = 1;
                        m.getUserList();
                    },
                }
            })
        }
    };
    m.init();
})();