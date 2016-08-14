(function () {
    var wages = {
        sz: 20,
        t: 0,
        cp: 1
    };
    var m = {
        init: function () {
            m.getList();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/customermanager/wages?cp=" + wages.cp + "&sz=" + wages.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    wages.wage = d.data;
                    wages.t = d.data.totalCount;
                    //m.getAreaWage();
                    m.buildVue();
                });
            });
        },
        // getAreaWage: function () {
        //     $.when($.ajax({
        //         url: $.apiUrl + "/user/wage",
        //         type: "GET"
        //     })).done(function (d) {
        //         $.ylbAjaxHandler(d, function () {
        //             wages.areawage = d.data;
        //             m.buildVue();
        //         });
        //     });
        // },
        buildVue: function () {
            wages = new Vue({
                el: "#wages-main",
                data: wages,
                methods: {
                    sendwage: function (id) {
                        $.ajax({
                            url: $.apiUrl + "/customermanager/wage",
                            type: "POST",
                            data: JSON.stringify({
                                userID: id
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("操作成功");
                                m.getList();
                            });
                        })
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
    m.init();
})();