(function () {
    var users = {
        pc: "",
        cc: "",
        ac: "",
        plist: [],
        clist: [],
        alist: []
    };
    var m = {
        init: function () {
            m.getUserList();
        },
        getplist: function () {
            $.when($.ajax({
                url: $.apiUrl + "/address",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    user.plist = d.data;
                    m.buildVue();
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
                url: $.apiUrl + "",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    user.list = d.data;
                    m.getplist();
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
                }
            })
        }
    };
    m.init();
})();