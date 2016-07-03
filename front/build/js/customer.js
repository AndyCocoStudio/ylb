(function () {
    var vcustomer = {
        covershow: false,
        sendshow: false,
        spendshow: false,
        applyrole: -1,
        sid: $.getID(),
        jfdh: true,
        xsxf: false,
        sjzd: false,
        spendpoint: {
            name: "",
            type: "",
            count: "",
            total: "",
            point: "",
            mobile: ""
        }
    };
    var m = {
        init: function () {
            $.checkSession();
            m.getUserInfo();
        },
        createQRcode: function () {
            var url = "http://www.hnylbsc.com/sendpoint.html?uid=" + vcustomer.info.mobile;
            $('#customer-private-qrcode').qrcode({
                render: "table",
                width: 130,
                height: 130,
                text: url
            });
        },
        getUserInfo: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/abstract",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.info = d.data;
                    m.getJFDHOrder();
                    //m.buildVue();
                });
            });
        },
        getJFDHOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/orders?k=1",
                type: "GET",
                //data: JSON.stringify({ k: 0 })
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.jfdhlist = d.data.orders;
                    m.getXSXFOrder();
                });
            });
        },
        getXSXFOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/orders?k=2",
                type: "GET",
               // data: JSON.stringify({ k: 2 })
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.xsxflist = d.data.orders;
                    if (vcustomer.info.role == "Merchants") m.getSJZDOrder();
                    else m.buildVue();
                });
            });
        },
        getSJZDOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/orders?k=0",
                type: "GET",
                //data: JSON.stringify({ k: 1 })
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.sjzdlist = d.data.orders;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            vcustomer = new Vue({
                el: "#customer-main",
                data: vcustomer,
                methods: {
                    selectorder: function (t) {
                        switch (t) {
                            case 1:
                                vcustomer.jfdh = true;
                                vcustomer.sjzd = false;
                                vcustomer.xsxf = false;
                                break;
                            case 2:
                                vcustomer.jfdh = false;
                                vcustomer.sjzd = false;
                                vcustomer.xsxf = true;
                                break;
                            case 3:
                                vcustomer.jfdh = false;
                                vcustomer.sjzd = true;
                                vcustomer.xsxf = false;
                                break;
                            default:
                                vcustomer.jfdh = true;
                                vcustomer.sjzd = false;
                                vcustomer.xsxf = false;
                                break;
                        }
                    },
                    sendpoints: function () {
                        this.covershow = true;
                        this.sendshow = true;
                    },
                    spendpoints: function () {
                        this.covershow = true;
                        this.spendshow = true;
                    },
                    hideall: function () {
                        this.covershow = false;
                        this.sendshow = false;
                        this.spendshow = false;
                    },
                    pchange: function () {
                        if (this.spendpoint.point > this.spendpoint.total * 0.8) {
                            this.spendpoint.point = (this.spendpoint.total * 0.8).toFixed(2);
                        }
                    },
                    getqrcode: function () {
                        this.createSpendpointQRcode();
                    },
                    getpoint: function () {
                        this.getPointPerDay();
                    },
                    //*****ajaxMethod******//
                    getPointPerDay: function () {
                        $.ajax({
                            url: $.apiUrl + "/score",
                            type: "GET"
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("领取成功！");
                                m.getUserInfo();
                            });
                        });
                    },
                    createSpendpointQRcode: function () {
                        $.ajax({
                            url: $.apiUrl + "/order/shoppingoffline",
                            type: "PUT",
                            data: JSON.stringify({
                                "goodsName": vcustomer.spendpoint.name,
                                "goodsKind": vcustomer.spendpoint.type,
                                "userMobile": vcustomer.spendpoint.mobile,
                                "score": vcustomer.spendpoint.point,
                                "quantity": vcustomer.spendpoint.count,
                                "totalPrice": vcustomer.spendpoint.total
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                var url = "http://www.hnylbsc.com/spendpoint.html?oid=" + d.data;
                                $('#spendpoint-qrcode').qrcode({
                                    render: "table",
                                    width: 240,
                                    height: 240,
                                    text: url
                                });
                            })
                        });
                    }
                }
            });
            m.createQRcode();
        }
    };
    m.init();
})();