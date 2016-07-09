(function () {
    var vsendpoint = {
        uid: $.urlParam("uid") || "",
        name: "",
        type: "",
        points: 0,
        poundage: 0,
        asset: {}
    };
    var m = {
        init: function () {
            m.getAsset();
            $.checkFlag();
        },
        getAsset: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/asset",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vsendpoint.asset = d.data;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            vsendpoint = new Vue({
                el: "#sendpoint-main",
                data: vsendpoint,
                methods: {
                    createOrder: function () {
                        $.ajax({
                            url: $.apiUrl + "/order/givingscore",
                            type: 'PUT',
                            data: JSON.stringify({
                                "goodsName": vsendpoint.name,
                                "goodsKind": vsendpoint.type,
                                "userMobile": vsendpoint.uid,
                                "score": vsendpoint.points,
                                "deduction": vsendpoint.poundage
                            })
                        }).done(function (d) {
                            console.log(d);
                            $.ylbAjaxHandler(d, function () {
                                window.location.href = "pay.html?oid=" + d.data;
                            });
                        });
                    }
                }
            });
        }
    };
    m.init();
})();