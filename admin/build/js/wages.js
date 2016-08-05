(function () {
    var wages = {};
    var m = {
        init: function () {
            m.getList();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/areamanager/wages",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    wages.list = d.data.wages;
                    wages.year = d.data.year;
                    wages.month = d.data.month;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            wages = new Vue({
                el: "#wages-main",
                data: wages,
                methods: {
                    sendwage: function (id) {
                        $.ajax({
                            url: $.apiUrl + "/areamanager/wage",
                            type: "POST",
                            data: JSON.stringify({
                                userID: id
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("操作成功！");
                                m.getList();
                            })
                        });
                    }
                }
            })
        }
    };
    m.init()
})();