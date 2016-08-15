(function () {
    var wages = {
        cp: 1,
        sz: 20,
        t: 0
    };
    var m = {
        init: function () {
            m.getList();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/areamanager/wages?cp=" + wages.cp + "&sz=" + wages.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    wages.list = d.data.wages;
                    wages.year = d.data.year;
                    wages.month = d.data.month;
                    wages.t = d.data.totalCount;
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
                    },
                    prev: function () {
                        if (wages.cp <= 1) {
                            return;
                        } else {
                            wages.cp = +wages.cp - 1;
                            m.getList();
                        }
                    },
                    next: function () {
                        if (wages.cp >= Math.ceil(wages.t / wages.sz)) {
                            return;
                        } else {
                            wages.cp = +wages.cp + 1;
                            m.getList();
                        }
                    },
                    jump: function () {
                        if (wages.cp >= Math.ceil(wages.t / wages.sz)) wages.cp = Math.ceil(wages.t / wages.sz);
                        if (wages.cp <= 1) wages.cp = 1;
                        m.getList();
                    },
                }
            })
        }
    };
    m.init()
})();