(function () {
    var vcustomer = {
        sid: $.getID(),
        avatar: false,
        address: false,
        password: true,
        detail: false,
        confirmpwd: "",
        pwd: {
            currentPassword: "",
            newPassword: ""
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
        userinfo: {
            "gender": "f",//性别
            "name": "",//姓名
            "mobile": "",//手机号
            "idCard": "",//身份证号
            "province": "",
            "provinceCode": "",
            "city": "",
            "cityCode": "",
            "area": "",
            "areaCode": "",
            "street": ""
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
        //创建做单二维码
        createQRcode: function () {
            var url = "http://www.hnylbsc.com/sendpoint.html?uid=" + vcustomer.info.mobile;
            $('#customer-private-qrcode').qrcode({
                render: "table",
                width: 130,
                height: 130,
                text: url
            });
        },
        //获取用户信息
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
        //获取用户地址
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
        //获取用户详细信息
        getDetail: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/detail",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.userDetail = d.data;
                    vcustomer.userinfo = d.data;
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
                    //切换功能表单
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
                    //设置支付密码
                    setpaypwd: function () {
                        if (vcustomer.confirmpwd !== vcustomer.pwd.newPassword) {
                            alert("两次输入的密码不一致");
                            return;
                        } else {
                            $.ajax({
                                url: $.apiUrl + "/user/password",
                                type: "POST",
                                data: JSON.stringify(vcustomer.pwd)
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    alert("密码设置成功");
                                    vcustomer.pwd = {
                                        currentPassword: "",
                                        newPassword: ""
                                    }
                                    vcustomer.confirmpwd = "";
                                    $.localStorageHandler("set", "flag", true);
                                    setTimeout(function () {
                                        // var url = $.urlParam("url");
                                        // if (url) window.location.href = url;
                                        window.location = "/customer.html";
                                    }, 1500);
                                });
                            });
                        }
                    },
                    //切换省
                    changeprov: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        vcustomer.newaddress.provinceCode = v;
                        vcustomer.newaddress.province = t;
                        vcustomer.userinfo.provinceCode = v;
                        vcustomer.userinfo.province = t;
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
                        vcustomer.userinfo.cityCode = v;
                        vcustomer.userinfo.city = t;
                        m.getAlist(v);
                    },
                    //切换区
                    changearea: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        vcustomer.newaddress.areaCode = v;
                        vcustomer.newaddress.area = t;
                        vcustomer.userinfo.areaCode = v;
                        vcustomer.userinfo.area = t;
                    },
                    //选中编辑地址
                    editaddress: function (obj) {
                        vcustomer.newaddress.id = obj.addressID;
                        vcustomer.newaddress.name = obj.name;
                        vcustomer.newaddress.mobile = obj.mobile;
                        vcustomer.newaddress.province = obj.province;
                        vcustomer.newaddress.provinceCode = obj.provinceCode;
                        vcustomer.newaddress.city = obj.city;
                        vcustomer.newaddress.cityCode = obj.cityCode;
                        vcustomer.newaddress.area = obj.area;
                        vcustomer.newaddress.areaCode = obj.areaCode;
                        vcustomer.newaddress.street = obj.street;
                        vcustomer.newaddress.postCode = obj.postCode;
                        vcustomer.newaddress.isDefault = obj.isDefault;
                        m.getClist(obj.provinceCode);
                        m.getAlist(obj.cityCode);
                    },
                    //清空选中地址
                    clearaddress: function () {
                        vcustomer.newaddress = {
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
                        };
                    },
                    //保存地址
                    saveaddress: function () {
                        if (vcustomer.newaddress.id) {
                            //修改地址
                            var a = {
                                id: vcustomer.newaddress.id,
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
                                type: "POST",
                                data: JSON.stringify(a)
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("修改地址成功");
                                    m.getAddress();
                                });
                            });
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
                    },
                    //保存个人头像
                    saveavatar: function () {
                        $.ajax({
                            url: $.apiUrl + "/user/avatar",
                            type: "POST",
                            data: JSON.stringify({ "avatar": vcustomer.useravatar })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("上传成功");
                                setTimeout(function () {
                                    window.location.href = window.location.href;
                                }, 1500);

                            });
                        });
                    },
                    //选择性别
                    changegender: function (el) {
                        var v = $(el.target).find("option:selected").val();
                        vcustomer.userinfo.gender = v;
                    },
                    //保存用户信息
                    saveuserinfo: function () {
                        var ui = {
                            avatar: vcustomer.userinfo.avatar,
                            gender: vcustomer.userinfo.gender,
                            name: vcustomer.userinfo.name,
                            mobile: vcustomer.userinfo.mobile,
                            idCard: vcustomer.userinfo.idCard,
                            province: vcustomer.userinfo.province,
                            provinceCode: vcustomer.userinfo.provinceCode,
                            city: vcustomer.userinfo.city,
                            cityCode: vcustomer.userinfo.cityCode,
                            area: vcustomer.userinfo.area,
                            areaCode: vcustomer.userinfo.areaCode,
                            street: vcustomer.userinfo.street
                        }
                        $.ajax({
                            url: $.apiUrl + "/user/detail",
                            type: "POST",
                            data: JSON.stringify(ui)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("修改成功！");
                            })
                        })
                    }
                }
            });
            m.createQRcode();
        }
    };
    m.init();
})();