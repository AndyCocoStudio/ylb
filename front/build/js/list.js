(function () {
    var m = {
        init: function () {
            setInterval(m.bannerAnimate, 4000);
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