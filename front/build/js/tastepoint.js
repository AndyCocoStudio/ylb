(function () {
    var taste = {
        sz: 20,
        mt: 0,
        mcp: 1,
        ot: 0,
        ocp: 1,
        ct: 0,
        ccp: 1,
        amct: 0,
        amccp: 1,
        amot: 0,
        amocp: 1,
        cmmt: 0,
        cmmcp: 1,
        cmot: 0,
        cmocp: 1,
        mobile: "",
        total: {
            count: [],
            area: {},
            customer: {},
            merchant: {}
        }
    };
    var m = {
        init: function () {
            m.getInfo();
        },
        getCount: function () {
            $.when($.ajax({
                url: $.apiUrl + "/mine/places",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    switch (taste.user.role) {
                        case "Merchants":
                            taste.total.count = d.data;
                            m.merchants();
                            break;
                        case "CustomerManager":
                            taste.total.count = d.data;
                            m.customerManager();
                            break;
                        case "AreaManager":
                            taste.total.count = d.data;
                            m.areaManager();
                            break;
                        case "CM":
                            for (var i = 0; i < d.data.length; i++) {
                                if (d.data[i].role == "CustomerManager") {
                                    taste.total.customer = d.data[i];
                                    continue;
                                }
                                if (d.data[i].role == "Merchants") {
                                    taste.total.merchant = d.data[i];
                                    continue;
                                }
                            }
                            m.cm();
                            break;
                        case "AM":
                            for (var i = 0; i < d.data.length; i++) {
                                if (d.data[i].role == "AreaManager") {
                                    taste.total.area = d.data[i];
                                    continue;
                                }
                                if (d.data[i].role == "Merchants") {
                                    taste.total.merchant = d.data[i];
                                    continue;
                                }
                            }
                            m.am();
                            break;
                        default:
                            alert("您是普通会员，没有赠送体验积分权限");
                            window.location.href = "customer.html";
                            break;
                    }
                });
            })
        },
        getInfo: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/abstract",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.user = d.data;
                    m.getCount();
                });
            });
        },
        merchants: function () {
            $.when($.ajax({
                url: $.apiUrl + "/merchant/users?cp=" + taste.ocp + "&sz=" + taste.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.olist = d.data.users;
                    taste.ot = d.data.totalCount;
                    m.buildVue();
                });
            });
        },
        customerManager: function () {
            $.when($.ajax({
                url: $.apiUrl + "/customermanager/merchants?cp=" + taste.mcp + "&sz=" + taste.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.mlist = d.data.merchants;
                    taste.mt = d.data.totalCount;
                    m.buildVue();
                });
            });
        },
        areaManager: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/customermanager?cp=" + taste.ccp + "&sz=" + taste.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.clist = d.data.customerManagers;
                    taste.ct = d.data.totalCount;
                    m.buildVue();
                });
            });
        },
        am: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/customermanager?cp=" + taste.amccp + "&sz=" + taste.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.clist = d.data.customerManagers;
                    taste.amct = d.data.totalCount;
                    $.when($.ajax({
                        url: $.apiUrl + "/merchant/users?cp=" + taste.amocp + "&sz=" + taste.sz,
                        type: "GET"
                    })).done(function (d) {
                        $.ylbAjaxHandler(d, function () {
                            taste.olist = d.data.users;
                            taste.amot = d.data.totalCount;
                            m.buildVue();
                        });
                    });
                });
            });
        },
        cm: function () {
            $.when($.ajax({
                url: $.apiUrl + "/customermanager/merchants?cp=" + taste.cmmcp + "&sz=" + taste.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.mlist = d.data.merchants;
                    taste.cmmt = d.data.totalCount;
                    $.when($.ajax({
                        url: $.apiUrl + "/merchant/users?cp=" + taste.cmocp + "&sz=" + taste.sz,
                        type: "GET"
                    })).done(function (d) {
                        $.ylbAjaxHandler(d, function () {
                            taste.olist = d.data.users;
                            taste.cmot = d.data.totalCount;
                            m.buildVue();
                        });
                    });
                });
            });
        },
        buildVue: function () {
            taste = new Vue({
                el: "#taste-main",
                data: taste,
                methods: {
                    toc: function (el) {
                        var cf = confirm("确定要赠送体验名额？");
                        if (cf) {
                            var id = $(el.target).attr("data-id");
                            var c = $(el.target).prev("input").val();
                            if (!c) {
                                $.ylbAlert("请输入赠送数量");
                                return;
                            }
                            $.ajax({
                                url: $.apiUrl + "/customermanager/quota",
                                type: "PUT",
                                data: JSON.stringify({
                                    receiverID: id,
                                    quota: c
                                })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("发送成功");
                                    m.getCount();
                                });
                            })
                        }
                    },
                    tom: function (el) {
                        var cf = confirm("确定要赠送体验名额？");
                        if (cf) {
                            var id = $(el.target).attr("data-id");
                            var c = $(el.target).prev("input").val();
                            if (!c) {
                                $.ylbAlert("请输入赠送数量");
                                return;
                            }
                            $.ajax({
                                url: $.apiUrl + "/merchant/quota",
                                type: "PUT",
                                data: JSON.stringify({
                                    receiverID: id,
                                    quota: c
                                })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("发送成功");
                                    m.getCount();
                                });
                            })
                        }
                    },
                    too: function (el) {
                        var cf = confirm("确定要赠送体验积分？");
                        if (cf) {
                            var id = $(el.target).attr("data-id");
                            $.ajax({
                                url: $.apiUrl + "/user/quota",
                                type: "PUT",
                                data: JSON.stringify({
                                    receiverID: id
                                })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("发送成功");
                                    m.getCount();
                                });
                            })
                        }
                    },
                    givept: function () {
                        if (!taste.mobile) {
                            $.ylbAlert("请输入手机号");
                        } else {
                            var c = confirm("确认要赠送积分给用户" + taste.mobile + "?");
                            if (c) {
                                $.ajax({
                                    url: $.apiUrl + "/user/quota",
                                    type: "PUT",
                                    data: JSON.stringify({
                                        mobile: taste.mobile
                                    })
                                }).done(function (d) {
                                    $.ylbAjaxHandler(d, function () {
                                        $.ylbAlert("发送成功");
                                        m.getCount();
                                    });
                                });
                            }
                        }
                    },
                    mprev: function () {
                        if (taste.mcp <= 1) {
                            return;
                        } else {
                            taste.mcp = +taste.mcp - 1;
                            m.getCustomer();
                        }
                    },
                    mnext: function () {
                        if (taste.mcp >= Math.ceil(taste.mt / taste.sz)) {
                            return;
                        } else {
                            taste.mcp = +taste.mcp + 1;
                            m.getCustomer();
                        }
                    },
                    mjump: function () {
                        if (taste.mcp >= Math.ceil(taste.mt / taste.sz)) taste.mcp = Math.ceil(taste.mt / taste.sz);
                        if (taste.mcp <= 1) taste.mcp = 1;
                        m.getCustomer();
                    },
                    oprev: function () {
                        if (taste.ocp <= 1) {
                            return;
                        } else {
                            taste.ocp = +taste.ocp - 1;
                            m.customerManager();
                        }
                    },
                    onext: function () {
                        if (taste.ocp >= Math.ceil(taste.ot / taste.sz)) {
                            return;
                        } else {
                            taste.ocp = +taste.ocp + 1;
                            m.customerManager();
                        }
                    },
                    ojump: function () {
                        if (taste.ocp >= Math.ceil(taste.ot / taste.sz)) taste.ocp = Math.ceil(taste.ot / taste.sz);
                        if (taste.ocp <= 1) taste.ocp = 1;
                        m.customerManager();
                    },
                    cprev: function () {
                        if (taste.ccp <= 1) {
                            return;
                        } else {
                            taste.ccp = +taste.ccp - 1;
                            m.customerManager();
                        }
                    },
                    cnext: function () {
                        if (taste.ccp >= Math.ceil(taste.ct / taste.sz)) {
                            return;
                        } else {
                            taste.ccp = +taste.ccp + 1;
                            m.customerManager();
                        }
                    },
                    cjump: function () {
                        if (taste.ccp >= Math.ceil(taste.ct / taste.sz)) taste.ccp = Math.ceil(taste.ct / taste.sz);
                        if (taste.ccp <= 1) taste.ccp = 1;
                        m.customerManager();
                    },
                    amcprev: function () {
                        if (taste.amccp <= 1) {
                            return;
                        } else {
                            taste.amccp = +taste.amccp - 1;
                            m.am();
                        }
                    },
                    amcnext: function () {
                        if (taste.amccp >= Math.ceil(taste.amct / taste.sz)) {
                            return;
                        } else {
                            taste.amccp = +taste.amccp + 1;
                            m.am();
                        }
                    },
                    amcjump: function () {
                        if (taste.amccp >= Math.ceil(taste.amct / taste.sz)) taste.amccp = Math.ceil(taste.amct / taste.sz);
                        if (taste.amccp <= 1) taste.amccp = 1;
                        m.am();
                    },
                    amoprev: function () {
                        if (taste.amocp <= 1) {
                            return;
                        } else {
                            taste.amocp = +taste.amocp - 1;
                            m.am();
                        }
                    },
                    amonext: function () {
                        if (taste.amocp >= Math.ceil(taste.amot / taste.sz)) {
                            return;
                        } else {
                            taste.amocp = +taste.amocp + 1;
                            m.am();
                        }
                    },
                    amojump: function () {
                        if (taste.amocp >= Math.ceil(taste.amot / taste.sz)) taste.amocp = Math.ceil(taste.amot / taste.sz);
                        if (taste.amocp <= 1) taste.amocp = 1;
                        m.am();
                    },
                    cmmprev: function () {
                        if (taste.cmmcp <= 1) {
                            return;
                        } else {
                            taste.cmmcp = +taste.cmmcp - 1;
                            m.cm();
                        }
                    },
                    cmmnext: function () {
                        if (taste.cmmcp >= Math.ceil(taste.cmmt / taste.sz)) {
                            return;
                        } else {
                            taste.cmmcp = +taste.cmmcp + 1;
                            m.cm();
                        }
                    },
                    cmmjump: function () {
                        if (taste.cmmcp >= Math.ceil(taste.cmmt / taste.sz)) taste.cmmcp = Math.ceil(taste.cmmt / taste.sz);
                        if (taste.cmmcp <= 1) taste.cmmcp = 1;
                        m.cm();
                    },
                    cmoprev: function () {
                        if (taste.cmocp <= 1) {
                            return;
                        } else {
                            taste.cmocp = +taste.cmocp - 1;
                            m.cm();
                        }
                    },
                    cmonext: function () {
                        if (taste.cmocp >= Math.ceil(taste.cmot / taste.sz)) {
                            return;
                        } else {
                            taste.cmocp = +taste.cmocp + 1;
                            m.cm();
                        }
                    },
                    cmojump: function () {
                        if (taste.cmocp >= Math.ceil(taste.cmot / taste.sz)) taste.cmocp = Math.ceil(taste.cmot / taste.sz);
                        if (taste.cmocp <= 1) taste.cmocp = 1;
                        m.cm();
                    },
                }
            });
        }
    };
    m.init()
})();