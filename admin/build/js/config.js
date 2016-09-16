(function () {
    var config = {
        isedit: false
    };
    var m = {
        init: function () {
            m.getConfig();
        },
        getConfig: function () {
            $.when($.ajax({
                url: $.apiUrl + "/configs",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    config.option = d.data;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            config = new Vue({
                el: "#config-main",
                data: config,
                methods: {
                    edit: function (el) {
                        var _this = $(el.target);
                        var k = _this.attr("data-key");
                        var v = _this.attr("data-value");
                        var c = confirm("确定要设置该项？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/config",
                                type: "POST",
                                data: JSON.stringify({
                                    key: k,
                                    value: v
                                })
                            }).done(function (d) {
                                $.ylbAlert("设置成功！");
                                m.getConfig();
                            })
                        }
                    }
                }
            })
        }
    };
    m.init();
})();