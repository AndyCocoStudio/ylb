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
                url: $.apiUrl + "/config",
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
                    editable: function () {
                        config.isedit = !config.isedit;
                    }
                }
            })
        }
    };
    m.init();
})();