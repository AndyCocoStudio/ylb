(function () {
    var toarea = {
        cp: 1,
        sz: 20,
        t: 0
    };
    var m = {
        init: function () {
            m.getAreaList();
        },
        getAreaList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/all?cp=" + toarea.cp + "&sz=" + toarea.sz + "&k=0",
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
                }
            })
        }
    };
    m.init();
})();