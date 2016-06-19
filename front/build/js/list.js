(function () {
    var datas = {
        k: $.urlParam("k") || "",
        n: $.urlParam("n") || ""
    };
    var m = {
        init: function () {
            setInterval(m.bannerAnimate, 4000);
            m.loadList();
        },
        loadList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/goods/query",
                type: "GET",
                data: {
                    k: datas.k,
                    n: datas.n
                }
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    datas.data = d.data;
                    m.buildVue();
                });
            });
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