(function () {
    var datas = {
        id: 222
    };
    var m = {
        init: function () {
            setInterval(m.bannerAnimate, 4000);
            m.buildVue();
        },
        buildVue: function () {
            datas = new Vue({
                el: "#list-main",
                data: datas,
                methods: {}
            });
        },
        bannerAnimate: function () {
            var tar = $(".list-banner").find(".select");
            var nt;
            var l = $(".list-banner li").length;
            var i = tar.index();
            (i >= l - 1) ? nt = $(".list-banner li:first-child") : nt = tar.next("li");
            tar.fadeOut().removeClass("select");
            nt.addClass("select").fadeIn();
        }
    }
    m.init();
})();