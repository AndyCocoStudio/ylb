(function () {
    var right = {
        plist: [],
        clist: [],
        alist: [],
        apply: {
            province: "",
            provinceCode: "",
            city: "",
            cityCode: "",
            area: "",
            areaCode: "",
            mobile: "",
            name: "",
            captcha: "",
            referrerMobile: "",
            idCard: "",
            idCardImages: [],
        }
    };
    var m = {
        init: function () {
            m.getPlist();
        },
        getPlist: function () {
            $.when($.ajax({
                url: $.apiUrl + "/address",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    right.plist = d.data;
                    m.buildVue();
                });
            });
        },
        updateCity: function (code) {
            $.when($.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    right.clist = d.data;
                    m.buildVue();
                });
            });
        },
        updateArea: function (code) {
            $.when($.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    right.alist = d.data;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            right = new Vue({
                el: "#right-main",
                data: right,
                methods: {
                    changeprov: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        var n = $(el.target).find("option:selected").text();
                        right.apply.province = n;
                        right.apply.provinceCode = c;
                        right.alist = [];
                        m.updateCity(c);
                    },
                    changecity: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        var n = $(el.target).find("option:selected").text();
                        right.apply.city = n;
                        right.apply.cityCode = c;
                        m.updateArea(c);
                    },
                    changearea: function (el) {
                        var c = $(el.target).find("option:selected").val();
                        var n = $(el.target).find("option:selected").text();
                        right.apply.area = n;
                        right.apply.areaCode = c;
                    },
                    toupgrade: function () {
                        $.ajax({
                            url: $.apiUrl + "/areamanager",
                            type: "PUT",
                            data: JSON.stringify(right.apply)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("添加成功！");
                                right.apply.mobile = "";
                            });
                        });
                    }
                }
            });
            setTimeout(function () {
                $.setLeftBar("upgraderight");
            }, 100);
        }
    };
    m.init();
})();