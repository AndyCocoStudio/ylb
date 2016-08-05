(function () {
    var right = {
        amshow: false,
        cmshow: false,
        mshow: false,
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
                urls = $.apiUrl + "/user/all?cp=1&sz=1000&k=0&mobile=" + mb + "&name=" + n;
            } else {
                urls = $.apiUrl + "/user/all?cp=1&sz=1000&k=0";
            }
            $.when($.ajax({
                url: urls,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    right.amlist = d.data.areaManagers;
                    m.getCustomer();
                });
            });
        },
        getCustomer: function (mb, n) {
            var urls = "";
            if (mb || n) {
                urls = $.apiUrl + "/user/all?cp=1&sz=1000&k=1&mobile=" + mb + "&name=" + n;
            } else {
                urls = $.apiUrl + "/user/all?cp=1&sz=1000&k=1";
            }
            $.when($.ajax({
                url: urls,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    right.cmlist = d.data.customerManagers;
                    m.getMerchant();
                });
            });
        },
        getMerchant: function (mb, n) {
            var urls = "";
            if (mb || n) {
                urls = $.apiUrl + "/user/all?cp=1&sz=1000&k=2&mobile=" + mb + "&name=" + n;
            } else {
                urls = $.apiUrl + "/user/all?cp=1&sz=1000&k=2";
            }
            $.when($.ajax({
                url: urls,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    right.mlist = d.data.merchants;
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
                    }
                }
            })
        }
    };
    m.init();
})();