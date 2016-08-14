(function () {
    var record = {
        ccp: 1,
        ct: 0,
        cmcp: 1,
        cmt: 0,
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
                    record.user = d.data;
                    if (d.data.role == "AreaManager" || d.data.role == "AM") {
                        m.getAMerchant();
                    } else {
                        m.getCMerchant();
                    }
                });
            });
        },
        getAMerchant: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/merchants?cp=" + record.cmcp + "&sz=" + record.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    record.ml = d.data.merchants;
                    record.cmt = d.data.totalCount;
                    m.getCustomer();
                });
            });
        },
        getCMerchant: function () {
            $.when($.ajax({
                url: $.apiUrl + "/customermanager/merchants?cp=" + record.cmcp + "&sz=" + record.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    record.ml = d.data.merchants;
                    record.cmt = d.data.totalCount;
                    m.buildVue();
                });
            });
        },
        getCustomer: function () {
            $.when($.ajax({
                url: $.apiUrl + "/area/customermanager?cp=" + record.ccp + "&sz=" + record.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    record.cm = d.data.customerManagers;
                    record.ct = d.data.totalCount;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            record = new Vue({
                el: "#record-main",
                data: record,
                methods: {
                    prev: function () {
                        if (record.ccp <= 1) {
                            return;
                        } else {
                            record.ccp = +record.ccp - 1;
                            m.getCustomer();
                        }
                    },
                    next: function () {
                        if (record.ccp >= Math.ceil(record.ct / record.sz)) {
                            return;
                        } else {
                            record.ccp = +record.ccp + 1;
                            m.getCustomer();
                        }
                    },
                    jump: function () {
                        if (record.ccp >= Math.ceil(record.ct / record.sz)) record.ccp = Math.ceil(record.ct / record.sz);
                        if (record.ccp <= 1) record.ccp = 1;
                        m.getCustomer();
                    },
                    cmprev: function () {
                        if (record.cmcp <= 1) {
                            return;
                        } else {
                            record.cmcp = +record.cmcp - 1;
                            if (record.user.role == "AreaManager" || record.user.role == "AM") m.getAMerchant();
                            else m.getCMerchant();
                        }
                    },
                    cmnext: function () {
                        if (record.cmcp >= Math.ceil(record.cmt / record.sz)) {
                            return;
                        } else {
                            record.cmcp = +record.cmcp + 1;
                            if (record.user.role == "AreaManager" || record.user.role == "AM") m.getAMerchant();
                            else m.getCMerchant();
                        }
                    },
                    cmjump: function () {
                        if (record.cmcp >= Math.ceil(record.cmt / record.sz)) record.cmcp = Math.ceil(record.cmt / record.sz);
                        if (record.cmcp <= 1) record.cmcp = 1;
                        if (record.user.role == "AreaManager" || record.user.role == "AM") m.getAMerchant();
                            else m.getCMerchant();
                    },
                }
            })
        }
    };
    m.init();
})();