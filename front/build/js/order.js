(function () {
    var order = {
        hideaddress: false,
        id: $.urlParam("id") || "",
        count: $.urlParam("count") || "",
        total: 0,
        postage: 0,
        ispoint: "disabled",
        maxpoint: 0,
        point: 0,
        product: {},
        address: {},
        select: {},
        note: "无",
        plist: [],
        clist: [],
        alist: [],
        selectprov: "",
        selectcity: "",
        selectarea: "",
        newaddress: {
            "name": "收货人姓名",
            "mobile": "手机号",
            "province": "省份",
            "provinceCode": "",
            "city": "城市",
            "cityCode": "330100",
            "area": "区域",
            "areaCode": "330104",
            "street": "街道地址",
            "isDefault": 1
        },
        selectaddress: {
            "name": "收货人姓名",
            "mobile": "手机号",
            "province": "省份",
            "provinceCode": "",
            "city": "城市",
            "cityCode": "330100",
            "area": "区域",
            "areaCode": "330104",
            "street": "街道地址",
            "isDefault": 1
        }
    };
    var m = {
        init: function () {
            m.getAddress();
            //m.getProduct();
        },
        getAddress: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/addresses",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    order.address = d.data;
                    m.getProduct();
                });
            });
        },
        getProduct: function () {
            if (order.id) {
                //直接购买
                $.when($.ajax({
                    url: $.apiUrl + "/goods/detail",
                    type: "GET",
                    data: {
                        id: order.id
                    }
                })).done(function (d) {
                    $.ylbAjaxHandler(d, function () {
                        order.product = d.data;
                        order.product.goodses[0].count = order.count;
                        m.countPrice();
                        m.buildVue();
                    });
                });
            } else {
                //购物车购买

            }

        },
        countPrice: function () {
            var t = 0, p = 0;
            for (var i = 0; i < order.product.goodses.length; i++) {
                var g = order.product.goodses[i];
                t += g.price * g.count;
                p += g.deduction * g.count;
            }
            order.total = t.toFixed(2);
            order.maxpoint = p;
        },
        buildVue: function () {
            order = new Vue({
                el: '#order-main',
                data: order,
                methods: {
                    showaddress: function () {
                        order.hideaddress = !order.hideaddress;
                    },
                    addcount: function (el) {
                        var i = $(el.target).attr("data-index");
                        order.product.goodses[i].count = +order.product.goodses[i].count;
                        order.product.goodses[i].count += 1;
                        m.countPrice();
                    },
                    reducecount: function (el) {
                        var i = $(el.target).attr("data-index");
                        order.product.goodses[i].count = +order.product.goodses[i].count;
                        if (order.product.goodses[i].count - 1 > 0) order.product.goodses[i].count -= 1;
                        m.countPrice();
                    },
                    canuse: function () {
                        if (order.ispoint == "disabled") order.ispoint = false;
                        else order.ispoint = "disabled";
                    },
                    usepoint: function () {
                        if (order.point > order.maxpoint) order.point = order.maxpoint;
                    },
                    newaddress: function () {

                    },
                    neworder: function () {
                        var datas = {}, oid = "", p = "";
                        for (var i = 0; i < order.product.goodses.length; i++) {
                            var g = order.product.goodses[i];
                            p += "{goodsID:" + g.goodsID + ",quantity:" + g.count + ",note:" + order.note + "},";
                        }
                        p = "[" + p.substring(0, p.length - 1) + "]";
                        datas.items = p;
                        datas.score = order.point;
                        datas.addressID = "123";
                        $.ajax({
                            url: $.apiUrl + "/order/shoppingonline",
                            type: "PUT",
                            data: JSON.stringify(datas)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                oid = d.data;
                                window.location.href = "pay.html?oid=" + oid;
                            })
                        });
                    }
                }
            });
        }
    };
    m.init();
})();