(function () {
    var taste = {
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
                                } else {
                                    taste.total.customer = "";
                                }
                                if (d.data[i].role == "Merchant") {
                                    taste.total.merchant = d.data[i];
                                } else {
                                    taste.total.merchant = "";
                                }
                            }
                            m.cm();
                            break;
                        case "AM":
                            for (var i = 0; i < d.data.length; i++) {
                                if (d.data[i].role == "AreaManager") {
                                    taste.total.area = d.data[i];
                                } else {
                                    taste.total.area = "";
                                }
                                if (d.data[i].role == "Merchant") {
                                    taste.total.merchant = d.data[i];
                                } else {
                                    taste.total.merchant = "";
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
                url: $.apiUrl + "/merchant/users?cp=1&sz=1000",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.olist = d.data.users;
                    m.buildVue();
                });
            });
        },
        customerManager: function () {
            $.when($.ajax({
                url: $.apiUrl + "/customermanager/merchants?cp=1&sz=1000",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.mlist = d.data.merchants;
                    m.buildVue();
                });
            });
        },
        areaManager: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/customermanager?cp=1&sz=1000",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.clist = d.data.customerManagers;
                    m.buildVue();
                });
            });
        },
        am: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/customermanager?cp=1&sz=1000",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.clist = d.data.customerManagers;
                    $.when($.ajax({
                        url: $.apiUrl + "/merchant/users?cp=1&sz=1000",
                        type: "GET"
                    })).done(function (d) {
                        $.ylbAjaxHandler(d, function () {
                            taste.olist = d.data.users;
                            m.buildVue();
                        });
                    });
                });
            });
        },
        cm: function () {
            $.when($.ajax({
                url: $.apiUrl + "/customermanager/merchants?cp=1&sz=1000",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    taste.mlist = d.data.merchants;
                    $.when($.ajax({
                        url: $.apiUrl + "/merchant/users?cp=1&sz=1000",
                        type: "GET"
                    })).done(function (d) {
                        $.ylbAjaxHandler(d, function () {
                            taste.olist = d.data.users;
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
                    }

                }
            });
        }
    };
    m.init()
})();