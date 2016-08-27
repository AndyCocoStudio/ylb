(function () {
    var poolinfo = {
        st: $.urlParam("st") || "",
        et: $.urlParam("et") || "",
        k: $.urlParam("k") || "",
        sz: 20,
        it: 1,
        icp: 1,
        ot: 1,
        ocp: 1,
        inl: true,
        outl: false
    };
    var m = {
        init: function () {
            m.getInList();
        },
        getInList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/statistics/pool/in?st=" + poolinfo.st + "&et=" + poolinfo.et + "&k=" + poolinfo.k + "&sz=" + poolinfo.sz + "&cp=" + poolinfo.icp,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    poolinfo.inlist = d.data.logs;
                    poolinfo.it = d.data.totalCount;
                    m.getOutList();
                });
            });
        },
        getOutList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/statistics/pool/out?st=" + poolinfo.st + "&et=" + poolinfo.et + "&k=" + poolinfo.k + "&sz=" + poolinfo.sz + "&cp=" + poolinfo.ocp,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    poolinfo.outlist = d.data.logs;
                    poolinfo.ot = d.data.totalCount;
                    m.buildVue();
                });
            })
        },
        buildVue: function () {
            poolinfo = new Vue({
                el: "#poolinfo-main",
                data: poolinfo,
                methods: {
                    changetap: function (id) {
                        switch (id) {
                            case 1:
                                poolinfo.inl = true;
                                poolinfo.outl = false;
                                break;
                            case 2:
                                poolinfo.inl = false;
                                poolinfo.outl = true;
                                break;
                            default:
                                poolinfo.inl = true;
                                poolinfo.outl = false;
                                break;
                        }
                    },
                    iprev: function () {
                        if (poolinfo.icp <= 1) {
                            return;
                        } else {
                            poolinfo.icp = +poolinfo.icp - 1;
                            m.getInList();
                        }
                    },
                    inext: function () {
                        if (poolinfo.icp >= Math.ceil(poolinfo.it / poolinfo.sz)) {
                            return;
                        } else {
                            poolinfo.icp = +poolinfo.icp + 1;
                            m.getInList();
                        }
                    },
                    ijump: function () {
                        if (poolinfo.icp >= Math.ceil(poolinfo.it / poolinfo.sz)) poolinfo.icp = Math.ceil(poolinfo.it / poolinfo.sz);
                        if (poolinfo.icp <= 1) poolinfo.icp = 1;
                        m.getInList();
                    },
                    oprev: function () {
                        if (poolinfo.ocp <= 1) {
                            return;
                        } else {
                            poolinfo.ocp = +poolinfo.ocp - 1;
                            m.getOutList();
                        }
                    },
                    onext: function () {
                        if (poolinfo.ocp >= Math.ceil(poolinfo.ot / poolinfo.sz)) {
                            return;
                        } else {
                            poolinfo.ocp = +poolinfo.ocp + 1;
                            m.getOutList();
                        }
                    },
                    ojump: function () {
                        if (poolinfo.ocp >= Math.ceil(poolinfo.ot / poolinfo.sz)) poolinfo.ocp = Math.ceil(poolinfo.ot / poolinfo.sz);
                        if (poolinfo.ocp <= 1) poolinfo.ocp = 1;
                        m.getOutList();
                    },
                }
            })
        }
    };
    m.init();
})();