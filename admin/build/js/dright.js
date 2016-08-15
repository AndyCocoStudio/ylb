(function () {
    var right = {
        amshow: true,
        cmshow: false,
        mshow: false,
        sz: 20,
        at: 0,
        acp: 1,
        ct: 0,
        ccp: 1,
        mt: 0,
        mcp: 1,
        af: {
            mobile: "",
            name: ""
        },
        cf: {
            mobile: "",
            name: ""
        },
        mf: {
            mobile: "",
            name: ""
        }
    };
    var m = {
        init: function () {
            m.getArea();
        },
        getArea: function (mb, n) {
            var urls = "";
            if (mb || n) {
                urls = $.apiUrl + "/user/all?cp=" + right.acp + "&sz=" + right.sz + "&k=0&mobile=" + mb + "&name=" + n;
            } else {
                urls = $.apiUrl + "/user/all?cp=" + right.acp + "&sz=" + right.sz + "&k=0";
            }
            $.when($.ajax({
                url: urls,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    right.amlist = d.data.areaManagers;
                    right.at = d.data.totalCount;
                    m.getCustomer();
                });
            });
        },
        getCustomer: function (mb, n) {
            var urls = "";
            if (mb || n) {
                urls = $.apiUrl + "/user/all?cp=" + right.ccp + "&sz=" + right.sz + "&k=1&mobile=" + mb + "&name=" + n;
            } else {
                urls = $.apiUrl + "/user/all?cp=" + right.ccp + "&sz=" + right.sz + "&k=1";
            }
            $.when($.ajax({
                url: urls,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    right.cmlist = d.data.customerManagers;
                    right.ct = d.data.totalCount;
                    m.getMerchant();
                });
            });
        },
        getMerchant: function (mb, n) {
            var urls = "";
            if (mb || n) {
                urls = $.apiUrl + "/user/all?cp=" + right.mcp + "&sz=" + right.sz + "&k=2&mobile=" + mb + "&name=" + n;
            } else {
                urls = $.apiUrl + "/user/all?cp=" + right.mcp + "&sz=" + right.sz + "&k=2";
            }
            $.when($.ajax({
                url: urls,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    right.mlist = d.data.merchants;
                    right.mt = d.data.totalCount;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            right = new Vue({
                el: "#right-main",
                data: right,
                methods: {
                    toggleaml: function () {
                        this.amshow = !this.amshow;
                    },
                    togglecml: function () {
                        this.cmshow = !this.cmshow;
                    },
                    toggleml: function () {
                        this.mshow = !this.mshow;
                    },
                    fam: function () {
                        m.getArea(right.af.mobile, right.af.name);
                    },
                    fcm: function () {
                        m.getCustomer(right.cf.mobile, right.cf.name);
                    },
                    fm: function () {
                        m.getMerchant(right.mf.mobile, right.mf.name);
                    },
                    todr: function (id) {
                        var c = confirm("确认要对该用户进行降权？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/user/dismissal",
                                type: "POST",
                                data: JSON.stringify({ userID: id })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("操作成功！");
                                    m.getArea();
                                });
                            })
                        }
                    },
                    togglet: function (i) {
                        switch (i) {
                            case 1:
                                right.amshow = true;
                                right.cmshow = false;
                                right.mshow = false;
                                break;
                            case 2:
                                right.amshow = false;
                                right.cmshow = true;
                                right.mshow = false;
                                break;
                            case 3:
                                right.amshow = false;
                                right.cmshow = false;
                                right.mshow = true;
                                break;
                            default:
                                right.amshow = true;
                                right.cmshow = false;
                                right.mshow = false;
                                break;

                        }
                    },
                    aprev: function () {
                        if (right.acp <= 1) {
                            return;
                        } else {
                            right.acp = +right.acp - 1;
                            m.getArea();
                        }
                    },
                    anext: function () {
                        if (right.acp >= Math.ceil(right.at / right.sz)) {
                            return;
                        } else {
                            right.acp = +right.acp + 1;
                            m.getArea();
                        }
                    },
                    ajump: function () {
                        if (right.acp >= Math.ceil(right.at / right.sz)) right.acp = Math.ceil(right.at / right.sz);
                        if (right.acp <= 1) right.acp = 1;
                        m.getArea();
                    },
                    cprev: function () {
                        if (right.ccp <= 1) {
                            return;
                        } else {
                            right.ccp = +right.ccp - 1;
                            m.getCustomer();
                        }
                    },
                    cnext: function () {
                        if (right.ccp >= Math.ceil(right.ct / right.sz)) {
                            return;
                        } else {
                            right.ccp = +right.ccp + 1;
                            m.getCustomer();
                        }
                    },
                    cjump: function () {
                        if (right.ccp >= Math.ceil(right.ct / right.sz)) right.ccp = Math.ceil(right.ct / right.sz);
                        if (right.ccp <= 1) right.ccp = 1;
                        m.getCustomer();
                    },
                    mprev: function () {
                        if (right.mcp <= 1) {
                            return;
                        } else {
                            right.mcp = +right.mcp - 1;
                            m.getMerchant();
                        }
                    },
                    mnext: function () {
                        if (right.mcp >= Math.ceil(right.mt / right.sz)) {
                            return;
                        } else {
                            right.mcp = +right.mcp + 1;
                            m.getMerchant();
                        }
                    },
                    mjump: function () {
                        if (right.mcp >= Math.ceil(right.mt / right.sz)) right.mcp = Math.ceil(right.mt / right.sz);
                        if (right.mcp <= 1) right.mcp = 1;
                        m.getMerchant();
                    },
                }
            })
        }
    };
    m.init();
})();