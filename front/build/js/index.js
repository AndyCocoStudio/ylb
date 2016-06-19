(function () {
    var datas = {};
    var m = {
        init: function () {
            m.resizeWindow();
            m.domControl();
            m.getBanner();
        },
        getBanner: function () {
            $.when($.ajax({
                url: $.apiUrl + '/banner',
                type: 'GET'
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    datas.data = d.data;
                    m.buildVue();
                    m.setImages();
                });
            });
        },
        buildVue: function () {
            datas = new Vue({
                el: "#index-main",
                data: datas,
                methods: {

                }
            });
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