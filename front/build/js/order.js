(function () {
    var datas = {
        hideaddress: false,
        id: $.urlParam("id") || "",
        count: $.urlParam("count")
    };
    var m = {
        init: function () {
            //m.getAddress();
            m.getProduct();
        },
        getAddress: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/addresses",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    datas.address = d.data;
                    m.getProduct();
                });
            });
        },
        getProduct: function () {
            if (datas.id) {
                $.when($.ajax({
                    url: $.apiUrl + "/goods/detail",
                    type: "GET",
                    data: {
                        id: datas.id
                    }
                })).done(function (d) {
                    $.ylbAjaxHandler(d, function () {
                        datas.data = d.data;
                        datas.data.count = datas.count;
                        m.buildVue();
                    });
                });
            }

        },
        buildVue: function () {
            datas = new Vue({
                el: '#order-main',
                data: datas,
                methods: {
                    newaddress: function () {
                        datas.hideaddress = !datas.hideaddress;
                    },
                    addcount: function () {
                        datas.data.count = +datas.data.count;
                        datas.data.count += 1;
                    },
                    reducecount: function () {
                        datas.data.count = +datas.data.count;
                        if (+datas.data.count - 1 > 0) datas.data.count -= 1;
                    }
                }
            });
        }
    };
    m.init();
})();