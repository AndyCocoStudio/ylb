(function () {
    var m = {
        init: function () {
            m.setImages();
            m.resizeWindow();
            m.domControl();
        },
        setImages: function () {
            $(".index-main img").each(function () {
                var t = $(this);
                var tw = t.width();
                var th = t.height();
                var p = t.parent();
                var pw = p.width();
                var ph = p.height();
                var ts = tw / th;
                var ps = pw / ph;
                if (ts > ps) {
                    t.height(ph);
                    t.width("auto");
                } else {
                    t.width(pw);
                    t.height("auto")
                }
            });
        },
        resizeWindow: function () {
            $(window).resize(function () {
                m.setImages();
            });
        },
        domControl: function () {
            /** 
             * 遮罩
             **/
            $(".index-img").on({
                "mouseover": function () {
                    $(this).find("article").fadeIn();
                },
                "mouseleave": function () {
                    $(this).find("article").fadeOut();
                }
            });
        }
    }
    m.init();
})();