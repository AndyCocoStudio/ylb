(function () {
    var datas = {};
    var m = {
        init: function () {
            m.setScreenHeight();
            m.resizeWindow();
            m.buildVue();
        },
        buildVue: function () {
            datas = new Vue({
                el: "#detail-main",
                data: datas,
                methods: {

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