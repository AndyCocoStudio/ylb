(function () {
    var datas = {
        id: $.urlParam("id"),
    };
    var m = {
        init: function () {
            m.setScreenHeight();
            m.resizeWindow();
            //m.buildVue();
            m.getDetail();
        },
        getDetail: function () {
            $.when($.ajax({
                url: $.apiUrl + "/goods/detail",
                type: "GET",
                data: {
                    id: datas.id
                }
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    datas.data = d.data;
                    datas.data.count = 1;
                    datas.data.selected = 0;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            datas = new Vue({
                el: "#detail-main",
                data: datas,
                methods: {
                    addcart: function () {
                        $.ylbAddCart("product", datas.data);
                    }
                }
            });
        },
        setScreenHeight: function () {
            $(".detail-wrap, .detail-img, .detail-buy").height(+$(window).height() - 132);
        },
        resizeWindow: function () {
            $(window).resize(function () {
                m.setScreenHeight();
            })
        }
    };
    m.init();
})();