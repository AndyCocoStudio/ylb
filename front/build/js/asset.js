(function () {
    var asset = {
        tcp: 1,
        rcp: 1,
        ccp: 1,
        tt: 0,
        rt: 0,
        ct: 0,
        sz: 20
    };
    var m = {
        init: function () {
            m.getUserInfo();
        },
        getUserInfo: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/abstract",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    asset.user = d.data;
                    m.getAsset();
                });
            });
        },
        getAsset: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/asset",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    asset.detail = d.data;
                    m.getTransfer();
                });
            });
        },
        getTransfer: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/transfers?cp=" + asset.tcp + "&sz=" + asset.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    asset.transfer = d.data.transfers;
                    asset.tt = d.data.totalCount;
                    m.getRecharge();
                });
            });
        },
        getRecharge: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/recharges?cp=" + asset.rcp + "&sz=" + asset.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    asset.recharge = d.data.recharges;
                    asset.rt = d.data.totalCount;
                    if (asset.user.role == "Merchants" || asset.user.role == "AM" || asset.user.role == "CM") {
                        m.getCommission();
                    }
                    else {
                        m.buildVue();
                    }
                });
            })
        },
        getCommission: function () {
            $.when($.ajax({
                url: $.apiUrl + "/commissions?cp=" + asset.ccp + "&sz=" + asset.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    asset.commission = d.data.commissions;
                    asset.ct = d.data.totalCount;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            asset = new Vue({
                el: "#asset-main",
                data: asset,
                methods: {
                    cprev: function () {
                        if (asset.ccp <= 1) {
                            return;
                        } else {
                            asset.ccp = +asset.ccp - 1;
                            m.getCommission();
                        }
                    },
                    cnext: function () {
                        if (asset.ccp >= Math.ceil(asset.ct / asset.sz)) {
                            return;
                        } else {
                            asset.ccp = +asset.ccp + 1;
                            m.getCommission();
                        }
                    },
                    cjump: function () {
                        if (asset.ccp >= Math.ceil(asset.ct / asset.sz)) asset.ccp = Math.ceil(asset.ct / asset.sz);
                        if (asset.ccp <= 1) asset.ccp = 1;
                        m.getCommission();
                    },
                    rprev: function () {
                        if (asset.rcp <= 1) {
                            return;
                        } else {
                            asset.rcp = +asset.rcp - 1;
                            m.getRecharge();
                        }
                    },
                    rnext: function () {
                        if (asset.rcp >= Math.ceil(asset.rt / asset.sz)) {
                            return;
                        } else {
                            asset.rcp = +asset.rcp + 1;
                            m.getRecharge();
                        }
                    },
                    rjump: function () {
                        if (asset.rcp >= Math.ceil(asset.rt / asset.sz)) asset.rcp = Math.ceil(asset.rt / asset.sz);
                        if (asset.rcp <= 1) asset.rcp = 1;
                        m.getRecharge();
                    },
                    tprev: function () {
                        if (asset.tcp <= 1) {
                            return;
                        } else {
                            asset.tcp = +asset.tcp - 1;
                            m.getTransfer();
                        }
                    },
                    tnext: function () {
                        if (asset.tcp >= Math.ceil(asset.tt / asset.sz)) {
                            return;
                        } else {
                            asset.tcp = +asset.tcp + 1;
                            m.getTransfer();
                        }
                    },
                    tjump: function () {
                        if (asset.tcp >= Math.ceil(asset.tt / asset.sz)) asset.tcp = Math.ceil(asset.tt / asset.sz);
                        if (asset.tcp <= 1) asset.tcp = 1;
                        m.getTransfer();
                    }
                }
            })
        }
    };
    m.init();
})();