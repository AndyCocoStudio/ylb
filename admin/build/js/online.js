(function () {
    var online = {
        cover: false,
        express: false,
        cp: 1,
        sz: 20,
        t: 0,
        send: {
            orderID: "",
            expressID: "",
            expressName: ""
        }
    };
    var m = {
        init: function () {
            m.getList();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/order/shoppingonline?cp=" + online.cp + "&sz=" + online.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    online.list = d.data.orders;
                    online.t = d.data.totalCount;
                    m.buildVue();
                });
            })
        },
        buildVue: function () {
            online = new Vue({
                el: "#online-main",
                data: online,
                methods: {
                    showexpress: function (id) {
                        online.send.orderID = id;
                        online.express = true;
                        online.cover = true;
                    },
                    hideall: function () {
                        online.express = false;
                        online.cover = false;
                    },
                    sendgoods: function () {
                        $.ajax({
                            url: $.apiUrl + "/order/sent",
                            type: "POST",
                            data: JSON.stringify(online.send)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("操作成功！");
                                online.hideall();
                                m.getList();
                            });
                        });
                    },
                    prev: function () {
                        if (online.cp <= 1) {
                            return;
                        } else {
                            online.cp = +online.cp - 1;
                            m.getList();
                        }
                    },
                    next: function () {
                        if (online.cp >= Math.ceil(online.t / online.sz)) {
                            return;
                        } else {
                            online.cp = +online.cp + 1;
                            m.getList();
                        }
                    },
                    jump: function () {
                        if (online.cp >= Math.ceil(online.t / online.sz)) online.cp = Math.ceil(online.t / online.sz);
                        if (online.cp <= 1) online.cp = 1;
                        m.getList();
                    },
                }
            })
        }
    };
    m.init();
})();