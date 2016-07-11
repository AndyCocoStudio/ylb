(function () {
    var vcustomer = {
        sid: $.getID(),
        avatar: false,
        address: false,
        password: true,
        detail: false,
        pwd: {

        },
        newaddress: {
            id: "",
            name: "",
            mobile: "",
            province: "",
            provinceCode: "",
            city: "",
            cityCode: "",
            area: "",
            areaCode: "",
            street: "",
            postCode: "",
            isDefault: 1
        },
        useravatar: "",
        plist: [],
        clist: [],
        alist: []
    };
    var m = {
        init: function () {
            $.checkSession();
            m.getPlist();
            m.getUserInfo();
            m.uploadavatar();
        },
        uploadavatar: function () {
            $("#txsc").dropzone({
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: 1.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.useravatar = response.data;
                }
            });
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
                    vcustomer.useravatar = d.data.avatar;
                    m.getAddress();
                    //m.buildVue();
                });
            });
        },
        getAddress: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/addresses",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.addrList = d.data;
                    m.getDetail();
                });
            });
        },
        getDetail: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/detail",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.userDetail = d.data;
                    m.buildVue();
                });
            });
        },
        //获取省地址
        getPlist: function () {
            $.when($.ajax({
                url: $.apiUrl + "/address",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.plist = d.data;
                });
            });
        },
        //获取市地址
        getClist: function (code) {
            $.when($.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.clist = d.data;
                });
            });
        },
        //获取区地址
        getAlist: function (code) {
            $.when($.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.alist = d.data;
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
                    confirmpwd: function () {

                    },
                    //切换省
                    changeprov: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        vcustomer.newaddress.provinceCode = v;
                        vcustomer.newaddress.province = t;
                        vcustomer.alist = [];
                        m.getClist(v);
                    },
                    //切换市
                    changecity: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        vcustomer.newaddress.cityCode = v;
                        vcustomer.newaddress.city = t;
                        m.getAlist(v);
                    },
                    //切换区
                    changearea: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        vcustomer.newaddress.areaCode = v;
                        vcustomer.newaddress.area = t;
                    },
                    saveaddress: function () {
                        if (vcustomer.newaddress.id) {
                            //修改地址
                        } else {
                            //添加地址
                            var a = {
                                name: vcustomer.newaddress.name,
                                mobile: vcustomer.newaddress.mobile,
                                province: vcustomer.newaddress.province,
                                provinceCode: vcustomer.newaddress.provinceCode,
                                city: vcustomer.newaddress.city,
                                cityCode: vcustomer.newaddress.cityCode,
                                area: vcustomer.newaddress.area,
                                areaCode: vcustomer.newaddress.areaCode,
                                street: vcustomer.newaddress.street,
                                postCode: vcustomer.newaddress.postCode,
                                isDefault: 1
                            }
                            $.ajax({
                                url: $.apiUrl + "/user/address",
                                type: "PUT",
                                data: JSON.stringify(a)
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("地址添加成功");
                                    m.getAddress();
                                });
                            });
                        }
                    }
                }
            });
            m.createQRcode();
        }
    };
    m.init();
})();