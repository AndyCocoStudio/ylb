(function () {
    var datas = {
        cp: 1,
        t: 0,
        sz: 6,
        k1: $.urlParam("k1") || "",
        k2: $.urlParam("k2") || "",
        n: $.urlParam("n") || ""
    };
    var m = {
        init: function () {
            setInterval(m.bannerAnimate, 4000);
            m.loadList();
            $.checkFlag();
        },
        loadList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/goods/query?k1=" + datas.k1 + "&k2=" + datas.k2 + "&n=" + datas.n + "&cp=" + datas.cp + "&sz=" + datas.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    datas.product = d.data;
                    datas.t = d.data.totalCount;
                    //m.getNav();
                    m.buildVue();
                });
            });
        },
        getNav: function () {
            $.when($.ajax({
                url: $.apiUrl + "/goods/kinds",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    datas.nav = d.data;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            datas = new Vue({
                el: "#list-main",
                data: datas,
                methods: {
                    prev: function () {
                        if (datas.cp <= 1) {
                            return;
                        } else {
                            datas.cp = +datas.cp - 1;
                            m.loadList();
                        }
                    },
                    next: function () {
                        if (datas.cp >= Math.ceil(datas.t / datas.sz)) {
                            return;
                        } else {
                            datas.cp = +datas.cp + 1;
                            m.loadList();
                        }
                    },
                    jump: function () {
                        if (datas.cp >= Math.ceil(datas.t / datas.sz)) datas.cp = Math.ceil(datas.t / datas.sz);
                        if (datas.cp <= 1) datas.cp = 1;
                        m.loadList();
                    },
                }
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