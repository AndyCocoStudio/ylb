(function () {
    var pay = {
        id: $.urlParam("oid"),
        payway: 1
    };
    var m = {
        init: function () {
            m.getOrder();
        },
        getOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/bill?oid=" + pay.id,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    pay.order = d.data;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            pay = new Vue({
                el: "#pay-main",
                data: pay,
                methods: {
                    selectpayway: function (id) {
                        this.payway = id;
                    },
                    useb: function (el) {
                        if ($(el.target).is(":checked")) {
                            pay.isUseBalance = 1;
                        } else {
                            pay.isUseBalance = 0;
                        }
                    },
                    payorder: function () {
                        $.ylbConfirm({
                            msg: "请输入支付密码：<input class='paypwd' type='password'/>",
                            callback: function () {
                                var pwd = $(".paypwd").val();
                                $.ajax({
                                    url: $.apiUrl + "/pay",
                                    type: "POST",
                                    data: JSON.stringify({
                                        orderID: pay.id,
                                        password: pwd
                                    })
                                }).done(function (d) {
                                    $.ylbAjaxHandler(d, function () {
                                        if (d.data) {
                                            //补差价
                                            if (pay.payway == 2) {
                                                window.location.href = "http://api.hnylbsc.com/unionpay?id=" + pay.id;
                                            } else if (pay.payway == 1) {
                                                window.location.href = "http://api.hnylbsc.com/alipay?id=" + pay.id;
                                            }
                                        } else {
                                            //不补差价
                                            $.ylbAlert("支付成功！");
                                            setTimeout(function () {
                                                window.location.href = "customer.html";
                                            }, 1500);
                                        }
                                    });
                                });
                            }
                        });
                    }
                }
            })
        }
    };
    m.init();
})();