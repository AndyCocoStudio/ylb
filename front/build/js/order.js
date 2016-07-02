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
        showlist: false,
        plist: [],
        clist: [],
        alist: [],
        newaddress: {
            name: "",
            mobile: "",
            province: "",
            provinceCode: "",
            city: "",
            cityCode: "",
            area: "",
            areaCode: "",
            street: "",
            postCode: "",
            isDefault: 1
        }
    };
    var m = {
        init: function () {
            m.getAddress();
            m.getPlist();
        },
        //获取省地址
        getPlist: function () {
            $.when($.ajax({
                url: $.apiUrl + "/address",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    order.plist = d.data;
                });
            });
        },
        //获取市地址
        getClist: function (code) {
            $.when($.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    order.clist = d.data;
                });
            });
        },
        //获取区地址
        getAlist: function (code) {
            $.when($.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    order.alist = d.data;
                });
            });
        },
        //获取用户地址列表
        getAddress: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/addresses",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    order.address = d.data;
                    order.defaultaddress = d.data[0];
                    m.getProduct();
                });
            });
        },
        //更新用户地址
        updateAddress: function () {
            $.ajax({
                url: $.apiUrl + "/user/addresses",
                type: "GET"
            }).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    order.address = d.data;
                });
            });
        },
        //获取商品详情
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
        //计算价格
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
                    //选择收货地址
                    choseaddress: function (el) {
                        order.select.addressID = el.target.attributes["data-id"].value;
                    },
                    //切换添加新地址
                    showaddress: function () {
                        order.hideaddress = !order.hideaddress;
                    },
                    //显示全部地址
                    alladdress: function () {
                        order.showlist = !order.showlist;
                    },
                    //切换省
                    changeprov: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        order.newaddress.provinceCode = v;
                        order.newaddress.province = t;
                        order.alist = [];
                        m.getClist(v);
                    },
                    //切换市
                    changecity: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        order.newaddress.cityCode = v;
                        order.newaddress.city = t;
                        m.getAlist(v);
                    },
                    //切换区
                    changearea: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        order.newaddress.areaCode = v;
                        order.newaddress.area = t;
                    },
                    //增加数量
                    addcount: function (el) {
                        var i = $(el.target).attr("data-index");
                        order.product.goodses[i].count = +order.product.goodses[i].count;
                        order.product.goodses[i].count += 1;
                        m.countPrice();
                    },
                    //减少数量
                    reducecount: function (el) {
                        var i = $(el.target).attr("data-index");
                        order.product.goodses[i].count = +order.product.goodses[i].count;
                        if (order.product.goodses[i].count - 1 > 0) order.product.goodses[i].count -= 1;
                        m.countPrice();
                    },
                    //是否使用积分
                    canuse: function () {
                        if (order.ispoint == "disabled") order.ispoint = false;
                        else order.ispoint = "disabled";
                    },
                    //积分使用数量检测
                    usepoint: function () {
                        if (order.point > order.maxpoint) order.point = order.maxpoint;
                    },
                    //添加新地址
                    addaddress: function () {
                        $.ajax({
                            url: $.apiUrl + "/user/address",
                            type: "PUT",
                            data: JSON.stringify(order.newaddress)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("添加成功！");
                                m.updateAddress();
                            });
                        });
                    },
                    //删除地址
                    deleteadr:function(el){
                        var id = el.target.attributes["data-id"].value;
                        alert(id);
                        $.ajax({
                            url:$.apiUrl+"/user/address",
                            type:"DELETE",
                            data:JSON.stringify({
                                id: id
                            })
                        }).done(function(d){
                            $.ylbAjaxHandler(d,function(){
                                $.ylbAlert("删除成功！");
                                m.updateAddress();
                            });
                        });
                    },
                    //创建新订单
                    neworder: function () {
                        var datas = {}, oid = "", p = "";
                        for (var i = 0; i < order.product.goodses.length; i++) {
                            var g = order.product.goodses[i];
                            p += "{goodsID:" + g.goodsID + ",quantity:" + g.count + ",note:" + order.note + "},";
                        }
                        p = "[" + p.substring(0, p.length - 1) + "]";
                        datas.items = p;
                        datas.score = order.point;
                        datas.addressID = order.select.addressID;
                        $.ajax({
                            url: $.apiUrl + "/order/shoppingonline",
                            type: "PUT",
                            data: JSON.stringify(datas)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                oid = d.data;
                                //window.location.href = "pay.html?oid=" + oid;
                            })
                        });
                    }
                }
            });
        }
    };
    m.init();
})();