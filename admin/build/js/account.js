(function () {
    var account = {
        edita: false,
        cover: false,
        newa: false,
        na: {
            name: "",
            password: "",
            role: ""
        },
        ea: {}
    };
    var m = {
        init: function () {
            m.getRoleList();
        },
        getRoleList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/staff",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    account.list = d.data.staff;
                    m.buildVue();
                })
            });
        },
        buildVue: function () {
            account = new Vue({
                el: "#account-main",
                data: account,
                methods: {
                    editaccount: function (idx) {
                        account.edita = true;
                        account.cover = true;
                        account.ea = account.list[idx];
                    },
                    hideall: function () {
                        account.edita = false;
                        account.cover = false;
                        account.newa = false;
                    },
                    newaccount: function () {
                        account.newa = true;
                        account.cover = true;
                    },
                    nselrole: function (e) {
                        var v = $(e.target).find("option:selected").val();
                        account.na.role = v;
                    },
                    eselrole: function (e) {
                        var v = $(e.target).find("option:selected").val();
                        account.ea.role = v;
                    },
                    createaccount: function () {
                        $.ajax({
                            url: $.apiUrl + "/staff",
                            type: "PUT",
                            data: JSON.stringify(account.na)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("添加成功！");
                                account.hideall();
                                account.na = {
                                    name: "",
                                    password: "",
                                    role: ""
                                };
                                m.getRoleList();
                            })
                        });
                    },
                    updateaccount: function () {
                        $.ajax({
                            url: $.apiUrl + "/staff/password",
                            type: "POST",
                            data: JSON.stringify({
                                staffID: account.ea.staffID,
                                password: account.ea.password
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("修改成功！");
                                account.hideall();
                                m.getRoleList();
                            })
                        });
                    },
                    delaccount: function (id) {
                        var c = confirm("是否要删除该用户？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/staff?id=" + id,
                                type: "DELETE",
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("删除成功！");
                                    account.hideall();
                                    m.getRoleList();
                                })
                            });
                        }
                    }
                }
            })
        }
    };
    m.init();
})();