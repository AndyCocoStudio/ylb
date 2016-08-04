(function () {
    var right = {
        user: {},
        mobile: ""
    };
    var m = {
        init: function () {
            m.buildVue();
        },
        buildVue: function () {
            right = new Vue({
                el: "#right-main",
                data: right,
                methods: {
                    showinfo: function () {
                        if (!right.mobile) {
                            $.ylbAlert("请输入手机号码");
                            return;
                        } else {
                            $.ajax({
                                url: $.apiUrl + "?id=" + right.mobile,
                                type: "GET",
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    right.user = d.data;
                                });
                            });
                        }
                    },
                    todownright: function () {
                        var c = confirm("确认要对该用户进行降权？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "",
                                type: "POST",
                                data: JSON.stringify({ mobile: right.mobile })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("操作成功！");
                                    right.mobile = "";
                                    right.user = {};
                                });
                            })
                        }
                    }
                }
            })
        }
    };
    m.init();
})();