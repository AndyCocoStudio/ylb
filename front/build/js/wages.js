(function () {
    var wages = {};
    var m = {
        init: function () {
            m.getList();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/customermanager/wages",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    wages.wage = d.data;
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
                    }
                }
            })
        }
    };
    m.init();
})();