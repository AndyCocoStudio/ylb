(function () {
    var datas = {};
    var m = {
        init: function () {
            m.getBanner();
            $.checkFlag();
        },
        getBanner: function () {
            $.when($.ajax({
                url: $.apiUrl + '/banner',
                type: 'GET'
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    datas.banner = d.data;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            datas = new Vue({
                el: "#index-main",
                data: datas
            });
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
                    $(this).find("div").fadeOut();
                },
                "mouseleave": function () {
                    $(this).find("div").fadeIn();
                }
            });
        }
    }
    m.init();
})();