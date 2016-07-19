(function () {
    var vsendpoint = {
        uid: $.urlParam("uid") || "",
        name: "",
        type: "",
        points: 0,
        poundage: 0,
        asset: {},
        free: false
    };
    var m = {
        init: function () {
            m.getAsset();
            if (!vsendpoint.uid) vsendpoint.free = true;
            $.checkFlag();
        },
        getAsset: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/asset",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vsendpoint.asset = d.data;
                    m.getconfig();
                    //m.buildVue();
                });
            });
        },
        getconfig: function () {
            $.when($.ajax({
                url: $.apiUrl + "/config",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vsendpoint.config = d.data;
                    m.buildVue();
                })
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
                            $.ylbAjaxHandler(d, function () {
                                window.location.href = "pay.html?oid=" + d.data;
                            });
                        });
                    },
                    inuse: function () {
                        if (this.poundage > this.points * this.config.pr * this.config.gsd / 10000) {
                            this.poundage = (this.points * this.config.pr * this.config.gsd / 10000).toFixed(2);
                        }
                    }
                }
            });
        }
    };
    m.init();
})();