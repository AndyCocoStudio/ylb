(function () {
    var refund = {
        filter: {
            m: "",
            en: "",
            st: "",
            et: ""
        },
        cp: 1,
        sz: 25,
        t: 0,
        oid: "",
        note: "",
        gnote: false,
        cover: false
    };
    var m = {
        init: function () {
            m.getList();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/order/refund?k=1&cp=1&sz=" + refund.sz,
                type: "GET"
            })).done(function (d) {
                console.log(d);
                $.ylbAjaxHandler(d, function () {
                    refund.list = d.data;
                    m.buildVue();
                });
            });
        },
        filterList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/order/refund?k=1&m=" + refund.filter.m + "&et=" + refund.filter.et + "&st=" + refund.filter.st + "&en=" + refund.filter.en + "&cp=" + refund.cp + "&sz=" + refund.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    refund.list = d.data;
                });
            });
        },
        buildVue: function () {
            refund = new Vue({
                el: "#refund-main",
                data: refund,
                methods: {
                    filterlist: function () {
                        m.filterList();
                    },
                    shownote: function (id, note) {
                        refund.oid = id;
                        refund.note = note;
                        refund.gnote = true;
                        refund.cover = true;
                    },
                    addnote: function () {
                        $.ajax({
                            url: $.apiUrl + "/order/refund/note",
                            type: "POST",
                            data: JSON.stringify({
                                refundOrderID: refund.oid,
                                note: refund.note
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("添加成功！");
                                m.filterList();
                            })
                        });
                    },
                    hideall: function () {
                        refund.cover = false;
                        refund.gnote = false;
                    },
                    agree: function (id) {
                        var c = confirm("确认放款该笔退款？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/order/refund/complete",
                                type: "POST",
                                data: JSON.stringify({ refundOrderID: id })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("操作成功！");
                                    m.filterList();
                                });
                            });
                        }
                    },
                    disagree: function (id) {
                        var c = confirm("确认拒绝该笔退款？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/order/refund/reject",
                                type: "POST",
                                data: JSON.stringify({ refundOrderID: id })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("操作成功！");
                                    m.filterList();
                                });
                            });
                        }
                    },
                    prev: function () {
                        if (refund.cp <= 1) {
                            return;
                        } else {
                            refund.cp = +refund.cp - 1;
                            m.filterList();
                        }
                    },
                    next: function () {
                        if (refund.cp >= Math.ceil(refund.t / refund.sz)) {
                            return;
                        } else {
                            refund.cp = +refund.cp + 1;
                            m.filterList();
                        }
                    },
                    jump: function () {
                        if (refund.cp >= Math.ceil(refund.t / refund.sz)) refund.cp = Math.ceil(refund.t / refund.sz);
                        if (refund.cp <= 1) refund.cp = 1;
                        m.filterList();
                    }
                }
            });
            setTimeout(function () {
                $.setLeftBar("refundmoney");
            }, 100);
        }
    };
    m.init();
})();