(function () {
    var toarea = {

    };
    var m = {
        init: function () {
            m.getAreaList();
        },
        getAreaList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/all?cp=1&sz=1000&k=0", 
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    toarea.list = d.data.areaManagers;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            toarea = new Vue({
                el: "#toarea-main",
                data: toarea,
                methods: {
                    sends: function (el) {
                        var _this = $(el.target);
                        var id = _this.attr("data-id");
                        var num = _this.prev("input").val();
                        if (!num || num == "0") {
                            $.ylbAlert("请填写赠送数额");
                            return;
                        } else {
                            $.ajax({
                                url: $.apiUrl + "/areamanager/quota",
                                type: "PuT",
                                data: JSON.stringify({
                                    receiverID: id,
                                    quota: num
                                })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("赠送成功！");
                                    m.getAreaList();
                                });
                            });
                        }
                    }
                }
            })
        }
    };
    m.init();
})();