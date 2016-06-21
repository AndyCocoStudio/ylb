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
        getProduct: function () {
            var productlist = $.localStorageHandler("get", "product");
            if (productlist && productlist!="[]") {
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
                        var _this = $(el.target);
                        var id = _this.attr("data-id");
                        $.ylbRemoveCart("product", id);
                    }
                }
            });
        }
    };
    m.init();
})();