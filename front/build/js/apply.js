(function () {
    var apply = {
        id: $.urlParam("aid"),
        r: $.urlParam("r"),
        reason: false,
        reasons: ""
    };
    var m = {
        init: function () {
            m.getInfo();
        },
        getInfo: function () {
            $.when($.ajax({
                url: $.apiUrl + "/apply?id=" + apply.id + "&r=" + apply.r,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    apply.detail = d.data;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            apply = new Vue({
                el: "#apply-main",
                data: apply,
                methods: {
                    agree: function () {
                        var c = confirm("确认同意该申请？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/apply/allow",
                                type: "POST",
                                data: JSON.stringify({
                                    applicationID: apply.id
                                })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("操作成功");
                                    apply.reason = false;
                                    m.getInfo();
                                });
                            });
                        }
                    },
                    disagree: function () {
                        $.ajax({
                            url: $.apiUrl + "/apply/reject",
                            type: "POST",
                            data: JSON.stringify({
                                applicationID: apply.id,
                                reason: apply.reasons
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                apply.reason = false;
                                m.getInfo();
                            });
                        });
                    },
                    showreason: function () {
                        apply.reason = !apply.reason;
                    }
                }
            })
        }
    };
    m.init();
})();