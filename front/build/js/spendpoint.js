(function () {
    var spendpointer = {
        order: {
            merchantMobile: "",
            score: ""
        },
        merchant: {
            name: "",
            address: ""
        }

    };
    var m = {
        init: function () {
            m.buildVue();
        },
        buildVue: function () {
            spendpointer = new Vue({
                el: "#spendpoint-main",
                data: spendpointer,
                methods: {
                    createOrder: function () {
                        if (!spendpointer.order.merchantMobile) {
                            alert("请填入商家手机号");
                            return;
                        }
                        if (!spendpointer.order.score) {
                            alert("请填入兑换积分数");
                            return;
                        }
                        $.ajax({
                            url: $.apiUrl + "/order/shoppingoffline",
                            type: "PUT",
                            data: JSON.stringify({
                                merchantMobile: spendpointer.order.merchantMobile,
                                amount: spendpointer.order.score
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                window.location.href = "pay.html?oid=" + d.data;
                            });
                        });
                    },
                    getstoreinfo: function () {
                        spendpointer.merchant.name = "";
                        $.when($.ajax({
                            url: $.apiUrl + "/merchant?m=" + spendpointer.order.merchantMobile,
                            type: "GET"
                        })).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                spendpointer.merchant.name = d.data.storeName;
                                //spendpointer.merchant.address = d.data.address;
                            })
                        })
                    }
                }
            });
        }
    };
    m.init();
})();