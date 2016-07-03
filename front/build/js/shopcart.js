(function () {
    var datas = {
        checkbox: 0,
        nogoods: false,
        canorder: false
    };
    var m = {
        init: function () {
            m.getProduct();
            $(".shopcart-count").on("input", function () {
                var _this = $(this);
                if (_this.attr("data-select") == 1) {
                    m.countPrice();
                }
            });
        },
        countPrice: function () {
            var total = 0;
            for (var i = 0, j = datas.product.length; i < j; i++) {
                var t = datas.product[i];
                if (t.selected) {
                    var p = t.price;
                    var c = t.count;
                    total += p * c;
                }
            }
            $(".shopcart-price").html(total);
        },
        checkboxselect: function () {
            var i = 0;
            $("td input[type='checkbox']").each(function () {
                if ($(this).is(":checked")) i += 1;
            });
            if (i > 0) {
                datas.canorder = true;
                if (i == $("td input[type='checkbox']").length) {
                    $("th input[type='checkbox']").attr("checked", true);
                } else {
                    $("th input[type='checkbox']").attr("checked", false);
                }
            }
            else {
                datas.canorder = false;
                $("th input[type='checkbox']").attr("checked", false);
            }
        },
        getProduct: function () {
            var productlist = $.localStorageHandler("get", "product");
            if (productlist && productlist != "[]") {
                datas.product = $.parseHandler("sj", productlist);
            } else {
                datas.nogoods = true;
            }
            m.buildVue();
        },
        buildVue: function () {
            datas = new Vue({
                el: "#shopcart-main",
                data: datas,
                methods: {
                    selectpro: function (el) {
                        var _this = $(el.target);
                        var index = _this.attr("data-index");
                        if (_this.is(":checked")) {
                            datas.checkbox += 1;
                            datas.product[index].selected = 1;
                        }
                        else {
                            datas.checkbox -= 1;
                            datas.product[index].selected = 0;
                        }
                        m.checkboxselect();
                        m.countPrice();
                    },
                    add: function (el) {
                        var _this = $(el.target);
                        var index = _this.attr("data-index");
                        datas.product[index].count += 1;
                        m.countPrice();
                    },
                    reduce: function (el) {
                        var _this = $(el.target);
                        var index = _this.attr("data-index");
                        var _next = _this.next("input");
                        if (+_next.val() - 1 > 0) {
                            datas.product[index].count -= 1;
                            m.countPrice();
                        }
                    },
                    delpro: function (el) {
                        var del = confirm("确认要删除该商品？");
                        if (del) {
                            var id = el.target.attributes["data-id"].value;
                            $.ylbRemoveCart("product", id);
                            m.getProduct();
                            m.checkboxselect();
                            m.countPrice();
                        }
                    },
                    // selectall: function () {
                    //     if (datas.canorder) {
                    //         $("td input[type='checkbox']").attr("checked", false);
                    //     }
                    //     else {
                    //         $("td input[type='checkbox']").attr("checked", true);
                    //     }
                    //     datas.canorder = !datas.canorder;
                    // },
                    settle: function () {
                        var buylist = [];
                        for (var i = 0; i < datas.product.length; i++) {
                            var t = datas.product[i];
                            if (t.selected) {
                                buylist.push(t);
                                $.ylbRemoveCart("product", t.goodsID);
                            }
                        }
                        $.localStorageHandler("set", "shopcart", $.parseHandler("js", buylist));
                        window.location.href = "order.html";
                    }
                }
            });
        }
    };
    m.init();
})();