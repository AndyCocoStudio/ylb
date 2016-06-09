(function () {
    var m = {
        init: function () {
            m.setScreenHeight();
            m.resizeWindow();
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