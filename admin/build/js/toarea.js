(function () {
    var toarea = {
        cp: 1,
        sz: 20,
        t: 0,
        pc: "",
        cc: "",
        ac: "",
        plist: [],
        clist: [],
        alist: []
    };
    var m = {
        init: function () {
            m.getpList();
        },
        getpList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/address",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    toarea.plist = d.data;
                    m.getAreaList();
                });
            });
        },
        updatecity: function (code) {
            $.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            }).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    toarea.clist = d.data;
                });
            })
        },
        updatearea: function (code) {
            $.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            }).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    toarea.alist = d.data;
                });
            })
        },
        getAreaList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/all?cp=" + toarea.cp + "&sz=" + toarea.sz + "&k=0&pc=" + toarea.pc + "&cc=" + toarea.cc + "&ac=" + toarea.ac,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    toarea.list = d.data.areaManagers;
                    toarea.t = d.data.totalCount;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            toarea = new Vue({
                el: "#toarea-main",
                data: toarea,
                methods: {
                    sends: function (el) {
                        var _this = $(el.target);
                        var id = _this.attr("data-id");
                        var num = _this.prev("input").val();
                        if (!num || num == "0") {
                            $.ylbAlert("请填写赠送数额");
                            return;
                        } else {
                            $.ajax({
                                url: $.apiUrl + "/areamanager/quota",
                                type: "PuT",
                                data: JSON.stringify({
                                    receiverID: id,
                                    quota: num
                                })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("赠送成功！");
                                    m.getAreaList();
                                });
                            });
                        }
                    },
                    changeprov: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        toarea.pc = c;
                        toarea.cc = "";
                        toarea.ac = "";
                        toarea.alist = [];
                        m.updatecity(c);
                    },
                    changecity: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        toarea.cc = c;
                        toarea.ac = "";
                        m.updatearea(c);
                    },
                    changearea: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        toarea.ac = c;
                    },
                    prev: function () {
                        if (toarea.cp <= 1) {
                            return;
                        } else {
                            toarea.cp = +toarea.cp - 1;
                            m.getAreaList();
                        }
                    },
                    next: function () {
                        if (toarea.cp >= Math.ceil(toarea.t / toarea.sz)) {
                            return;
                        } else {
                            toarea.cp = +toarea.cp + 1;
                            m.getAreaList();
                        }
                    },
                    jump: function () {
                        if (toarea.cp >= Math.ceil(toarea.t / toarea.sz)) toarea.cp = Math.ceil(toarea.t / toarea.sz);
                        if (toarea.cp <= 1) toarea.cp = 1;
                        m.getAreaList();
                    },
                    filterlist: function () {
                        m.getAreaList();
                    }
                }
            });
            setTimeout(function () {
                $.setLeftBar("toarea");
            }, 100);
        }
    };
    m.init();
})();