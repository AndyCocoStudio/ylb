(function () {
    var vcustomer = {
        sid: $.getID(),
        avatar: false,
        address: false,
        password: true,
        detail: false,
        pwd:{
            
        }
    };
    var m = {
        init: function () {
            $.checkSession();
            m.getUserInfo();
        },
        createQRcode: function () {
            var url = "http://www.hnylbsc.com/sendpoint.html?uid=" + vcustomer.info.mobile;
            $('#customer-private-qrcode').qrcode({
                render: "table",
                width: 130,
                height: 130,
                text: url
            });
        },
        getUserInfo: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/abstract",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.info = d.data;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            vcustomer = new Vue({
                el: "#customer-main",
                data: vcustomer,
                methods: {
                    changetap: function (el) {
                        var _this = $(el.target);
                        var role = _this.attr("data-role");
                        switch (role) {
                            case "avatar":
                                this.avatar = true;
                                this.address = false;
                                this.password = false;
                                this.detail = false;
                                break;
                            case "address":
                                this.avatar = false;
                                this.address = true;
                                this.password = false;
                                this.detail = false;
                                break;
                            case "password":
                                this.avatar = false;
                                this.address = false;
                                this.password = true;
                                this.detail = false;
                                break;
                            case "detail":
                                this.avatar = false;
                                this.address = false;
                                this.password = false;
                                this.detail = true;
                                break;
                            default:
                                this.avatar = false;
                                this.address = false;
                                this.password = true;
                                this.detail = false;
                                break;
                        }
                    },
                    confirmpwd:function(){

                    }
                }
            });
            m.createQRcode();
        }
    };
    m.init();
})();