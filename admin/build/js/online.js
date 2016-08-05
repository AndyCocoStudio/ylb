(function () {
    online = {
        cover: false,
        express: false,
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
                url: $.apiUrl + "/order/shoppingonline",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    online.list = d.data.orders;
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
                    }
                }
            })
        }
    };
    m.init();
})();