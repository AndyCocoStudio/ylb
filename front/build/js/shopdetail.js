(function () {
    var detail = {
        sid: $.urlParam("sid") || "",
        info: {}
    };
    var m = {
        init: function () {
            m.getDetail();
        },
        getDetail: function () {
            $.when($.ajax({
                url: $.apiUrl + "/merchant/detail?id=" + detail.sid,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    detail.info = d.data;
                    m.buildVue();
                });
            })
        },
        buildVue: function () {
            detail = new Vue({
                el: "#detail-main",
                data: detail,
                methods: {

                }
            })
        }
    };
    m.init();
})();