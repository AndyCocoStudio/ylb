(function () {
    var approve = {
        zd: true,
        js: false,
        tx: false,
        zdr: false,
        jsr: false,
        txr: false,
        sz: 20,
        ocp: 1,
        ot: 1,
        aocp: 1,
        aot: 1,
        acp: 1,
        at: 1,
        aacp: 1,
        aat: 1,
        tcp: 1,
        tt: 1,
        atcp: 1,
        att: 1,
        st: "",
        et: ""
    };
    var m = {
        init: function () {
            m.getUnorder();
        },
        getUnorder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/givingscore?k=1&cp=" + approve.ocp + "&sz=" + approve.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    approve.order = d.data.orders;
                    approve.ot = d.data.totalCount;
                    m.getAllorder();
                });
            })
        },
        pageUnorder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/givingscore?k=1&cp=" + approve.ocp + "&sz=" + approve.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    approve.order = d.data.orders;
                    approve.ot = d.data.totalCount;
                });
            })
        },
        getAllorder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/givingscore?k=0&cp=" + approve.aocp + "&sz=" + approve.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    approve.aorder = d.data.orders;
                    approve.aot = d.data.totalCount;
                    m.getUnapply();
                });
            })
        },
        pageAllorder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/givingscore?k=0&cp=" + approve.aocp + "&sz=" + approve.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    approve.aorder = d.data.orders;
                    approve.aot = d.data.totalCount;
                });
            })
        },
        getUnapply: function () {
            $.when($.ajax({
                url: $.apiUrl + "/applies?k=1&cp=" + approve.acp + "&sz=" + approve.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    approve.apply = d.data.applies;
                    approve.at = d.data.totalCount;
                    m.getAllapply();
                });
            });
        },
        pageUnapply: function () {
            $.when($.ajax({
                url: $.apiUrl + "/applies?k=1&cp=" + approve.acp + "&sz=" + approve.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    approve.apply = d.data.applies;
                    approve.at = d.data.totalCount;
                });
            });
        },
        getAllapply: function () {
            $.when($.ajax({
                url: $.apiUrl + "/applies?k=0&cp=" + approve.aacp + "&sz=" + approve.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    approve.aapply = d.data.applies;
                    approve.aat = d.data.totalCount;
                    m.getUntransfer();
                });
            });
        },
        pageAllapply: function () {
            $.when($.ajax({
                url: $.apiUrl + "/applies?k=0&cp=" + approve.aacp + "&sz=" + approve.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    approve.aapply = d.data.applies;
                    approve.aat = d.data.totalCount;
                });
            });
        },
        getUntransfer: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/transfers?k=0&cp=" + approve.tcp + "&sz=" + approve.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    approve.transfer = d.data.transfers;
                    approve.tt = d.data.totalCount;
                    m.getAlltransfer();
                });
            });
        },
        pageUntransfer: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/transfers?k=0&cp=" + approve.tcp + "&sz=" + approve.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    approve.transfer = d.data.transfers;
                    approve.tt = d.data.totalCount;
                });
            });
        },
        getAlltransfer: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/transfers?k=1&cp=" + approve.atcp + "&sz=" + approve.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    approve.atransfer = d.data.transfers;
                    approve.att = d.data.totalCount;
                    m.buildVue();
                });
            });
        },
        pageAlltransfer: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/transfers?k=1&cp=" + approve.atcp + "&sz=" + approve.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    approve.atransfer = d.data.transfers;
                    approve.att = d.data.totalCount;
                });
            });
        },
        buildVue: function () {
            approve = new Vue({
                el: "#approve-main",
                data: approve,
                methods: {
                    changetip: function (num) {
                        switch (num) {
                            case 1:
                                this.zd = true;
                                this.js = false;
                                this.tx = false;
                                this.zdr = false;
                                this.jsr = false;
                                this.txr = false;
                                break;
                            case 2:
                                this.zd = false;
                                this.js = true;
                                this.tx = false;
                                this.zdr = false;
                                this.jsr = false;
                                this.txr = false;
                                break;
                            case 3:
                                this.zd = false;
                                this.js = false;
                                this.tx = true;
                                this.zdr = false;
                                this.jsr = false;
                                this.txr = false;
                                break;
                            case 4:
                                this.zd = false;
                                this.js = false;
                                this.tx = false;
                                this.zdr = true;
                                this.jsr = false;
                                this.txr = false;
                                break;
                            case 5:
                                this.zd = false;
                                this.js = false;
                                this.tx = false;
                                this.zdr = false;
                                this.jsr = true;
                                this.txr = false;
                                break;
                            case 6:
                                this.zd = false;
                                this.js = false;
                                this.tx = false;
                                this.zdr = false;
                                this.jsr = false;
                                this.txr = true;
                                break;
                            default:
                                this.zd = true;
                                this.js = false;
                                this.tx = false;
                                this.zdr = false;
                                this.jsr = false;
                                this.txr = false;
                                break;
                        }
                    },
                    agreetrs: function (id) {
                        var c = confirm("确认同意该转出申请？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/transfer/agree",
                                type: "POST",
                                data: JSON.stringify({
                                    transferID: id
                                })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("操作成功");
                                    m.getUntransfer();
                                });
                            });
                        }
                    },
                    rejecttrs: function (id) {
                        var c = confirm("确认决绝该转出申请？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/transfer/reject",
                                type: "POST",
                                data: JSON.stringify({
                                    transferID: id
                                })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("操作成功");
                                    m.getUntransfer();
                                });
                            });
                        }
                    },
                    oprev: function () {
                        if (approve.ocp <= 1) {
                            return;
                        } else {
                            approve.ocp = +approve.ocp - 1;
                            m.pageUnorder();
                        }
                    },
                    onext: function () {
                        if (approve.ocp >= Math.ceil(approve.ot / approve.sz)) {
                            return;
                        } else {
                            approve.ocp = +approve.ocp + 1;
                            m.pageUnorder();
                        }
                    },
                    ojump: function () {
                        if (approve.ocp >= Math.ceil(approve.ot / approve.sz)) approve.ocp = Math.ceil(approve.ot / approve.sz);
                        if (approve.ocp <= 1) approve.ocp = 1;
                        m.pageUnorder();
                    },
                    aoprev: function () {
                        if (approve.aocp <= 1) {
                            return;
                        } else {
                            approve.aocp = +approve.aocp - 1;
                            m.pageAllorder();
                        }
                    },
                    aonext: function () {
                        if (approve.aocp >= Math.ceil(approve.aot / approve.sz)) {
                            return;
                        } else {
                            approve.aocp = +approve.aocp + 1;
                            m.pageAllorder();
                        }
                    },
                    aojump: function () {
                        if (approve.aocp >= Math.ceil(approve.aot / approve.sz)) approve.aocp = Math.ceil(approve.aot / approve.sz);
                        if (approve.aocp <= 1) approve.aocp = 1;
                        m.pageAllorder();
                    },
                    aprev: function () {
                        if (approve.acp <= 1) {
                            return;
                        } else {
                            approve.acp = +approve.acp - 1;
                            m.pageUnapply();
                        }
                    },
                    anext: function () {
                        if (approve.acp >= Math.ceil(approve.at / approve.sz)) {
                            return;
                        } else {
                            approve.acp = +approve.acp + 1;
                            m.pageUnapply();
                        }
                    },
                    ajump: function () {
                        if (approve.acp >= Math.ceil(approve.at / approve.sz)) approve.acp = Math.ceil(approve.at / approve.sz);
                        if (approve.acp <= 1) approve.acp = 1;
                        m.pageUnapply();
                    },
                    aaprev: function () {
                        if (approve.aacp <= 1) {
                            return;
                        } else {
                            approve.aacp = +approve.aacp - 1;
                            m.pageAllapply();
                        }
                    },
                    aanext: function () {
                        if (approve.aacp >= Math.ceil(approve.aat / approve.sz)) {
                            return;
                        } else {
                            approve.aacp = +approve.aacp + 1;
                            m.pageAllapply();
                        }
                    },
                    aajump: function () {
                        if (approve.aacp >= Math.ceil(approve.aat / approve.sz)) approve.aacp = Math.ceil(approve.aat / approve.sz);
                        if (approve.aacp <= 1) approve.aacp = 1;
                        m.pageAllapply();
                    },
                    tprev: function () {
                        if (approve.tcp <= 1) {
                            return;
                        } else {
                            approve.tcp = +approve.tcp - 1;
                            m.pageUntransfer();
                        }
                    },
                    tnext: function () {
                        if (approve.tcp >= Math.ceil(approve.tt / approve.sz)) {
                            return;
                        } else {
                            approve.tcp = +approve.tcp + 1;
                            m.pageUntransfer();
                        }
                    },
                    tjump: function () {
                        if (approve.tcp >= Math.ceil(approve.tt / approve.sz)) approve.tcp = Math.ceil(approve.tt / approve.sz);
                        if (approve.tcp <= 1) approve.tcp = 1;
                        m.pageUntransfer();
                    },
                    atprev: function () {
                        if (approve.atcp <= 1) {
                            return;
                        } else {
                            approve.atcp = +approve.atcp - 1;
                            m.pageUntransfer();
                        }
                    },
                    atnext: function () {
                        if (approve.atcp >= Math.ceil(approve.att / approve.sz)) {
                            return;
                        } else {
                            approve.atcp = +approve.atcp + 1;
                            m.pageUntransfer();
                        }
                    },
                    atjump: function () {
                        if (approve.atcp >= Math.ceil(approve.att / approve.sz)) approve.atcp = Math.ceil(approve.att / approve.sz);
                        if (approve.atcp <= 1) approve.atcp = 1;
                        m.pageUntransfer();
                    },
                }
            })
        }
    };
    m.init();
})();