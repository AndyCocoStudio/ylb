(function () {
    var vcustomer = {
        covershow: false,
        sendshow: false,
        spendshow: false,
        applyrole: -1,
        sid: $.getID(),
        jfdh: true,
        xsxf: false,
        sjzd: false,
        role: "-1",
        plist: [],
        clist: [],
        alist: [],
        spendpoint: {
            name: "",
            type: "",
            count: "",
            total: "",
            point: "",
            mobile: ""
        },
        total: {},
        tj: {
            mobile: "",
            captcha: "",
            referrerMobile: ""
        },
        tobesaler: {
            "referrerMobile": "",
            "storeName": "",
            "province": "",
            "provinceCode": "",
            "city": "",
            "cityCode": "",
            "area": "",
            "areaCode": "",
            "street": "",
            "legalPersonIDCardImage": "",//法人身份证
            "legalPersonWithIDCardInHandImage": "",//法人手持身份证照片
            "storeAppearance": "",//店招
            "storeInsideImages": [],//店铺内部图片
            "license": ""
        }
    };
    var m = {
        init: function () {
            $.checkSession();
            $.checkFlag();
            m.getUserInfo();
            m.imgUpload();
            m.getProvince();
        },
        getProvince: function () {
            $.when($.ajax({
                url: $.apiUrl + "/address",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.plist = d.data;
                });
            });
        },
        getCity: function (code) {
            $.when($.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.clist = d.data;
                });
            })
        },
        getArea: function (code) {
            $.when($.ajax({
                url: $.apiUrl + "/address?code=" + code,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.alist = d.data;
                });
            })
        },
        imgUpload: function () {
            $("#yyzz").dropzone({
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: 1.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobesaler.license = response.data;
                }
            });
            $("#frsfz").dropzone({
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: 1.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobesaler.legalPersonIDCardImage = response.data;
                }
            });
            $("#zmt").dropzone({
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: 1.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobesaler.legalPersonWithIDCardInHandImage = response.data;
                }
            });
            $("#dzt").dropzone({
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: 1.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobesaler.storeAppearance = response.data;
                }
            });
            $("#dnt").dropzone({
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 4,
                maxFilesize: 4.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobesaler.storeInsideImages.push(response.data);
                }
            });
        },
        createQRcode: function () {
            var url = "http://www.hnylbsc.com/sendpoint.html?uid=" + vcustomer.info.mobile;
            $('#customer-private-qrcode').qrcode({
                render: "table",
                width: 140,
                height: 120,
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
                    vcustomer.tj.referrerMobile = d.data.mobile;
                    if (vcustomer.role == "AreaManager") {
                        m.getApply();
                    } else {
                        m.getJFDHOrder();
                    }
                });
            });
        },
        getApply:function(){
            $.when($.ajax({
                url: $.apiUrl + "/applies",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.apply = d.data.applies;
                    m.getJFDHOrder();
                });
            });
        },
        getJFDHOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/orders?k=1",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.jfdhlist = d.data.orders;
                    m.getXSXFOrder();
                });
            });
        },
        getXSXFOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/orders?k=2",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.xsxflist = d.data.orders;
                    if (vcustomer.info.role == "Merchants") m.getSJZDOrder();
                    else m.buildVue();
                });
            });
        },
        getSJZDOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/orders?k=0",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.sjzdlist = d.data.orders;
                    if (vcustomer.info.role == 'CustomerManager' || vcustomer.info.role == 'AreaManager') {
                        m.getTotal();
                    }
                    else {
                        m.buildVue();
                    }
                });
            });
        },
        getTotal: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/wage",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.total = d.data;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            vcustomer = new Vue({
                el: "#customer-main",
                data: vcustomer,
                methods: {
                    selectorder: function (t) {
                        switch (t) {
                            case 1:
                                vcustomer.jfdh = true;
                                vcustomer.sjzd = false;
                                vcustomer.xsxf = false;
                                break;
                            case 2:
                                vcustomer.jfdh = false;
                                vcustomer.sjzd = false;
                                vcustomer.xsxf = true;
                                break;
                            case 3:
                                vcustomer.jfdh = false;
                                vcustomer.sjzd = true;
                                vcustomer.xsxf = false;
                                break;
                            default:
                                vcustomer.jfdh = true;
                                vcustomer.sjzd = false;
                                vcustomer.xsxf = false;
                                break;
                        }
                    },
                    sendpoints: function () {
                        this.covershow = true;
                        this.sendshow = true;
                    },
                    spendpoints: function () {
                        this.covershow = true;
                        this.spendshow = true;
                    },
                    hideall: function () {
                        this.covershow = false;
                        this.sendshow = false;
                        this.spendshow = false;
                    },
                    pchange: function () {
                        if (this.spendpoint.point > this.spendpoint.total * 0.8) {
                            this.spendpoint.point = (this.spendpoint.total * 0.8).toFixed(2);
                        }
                    },
                    getqrcode: function () {
                        this.createSpendpointQRcode();
                    },
                    getpoint: function () {
                        this.getPointPerDay();
                    },
                    rolechange: function (el) {
                        vcustomer.role = $(el.target).val();
                    },
                    changeprov: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        vcustomer.tobesaler.provinceCode = v;
                        vcustomer.tobesaler.province = t;
                        vcustomer.alist = [];
                        m.getCity(v);
                    },
                    changecity: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        vcustomer.tobesaler.cityCode = v;
                        vcustomer.tobesaler.city = t;
                        m.getArea(v);
                    },
                    changearea: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        vcustomer.tobesaler.areaCode = v;
                        vcustomer.tobesaler.area = t;
                    },
                    apysaler: function () {
                        $.ajax({
                            url: $.apiUrl + "/user/merchant",
                            type: "PUT",
                            data: JSON.stringify(vcustomer.tobesaler)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("申请成功！");
                            });
                        });
                    },
                    logon: function () {
                        $.ajax({
                            url: $.apiUrl + "/user/register",
                            type: "PUT",
                            data: JSON.stringify(vcustomer.tj)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("创建成功");
                                vcustomer.tj = {
                                    mobile: "",
                                    captcha: "",
                                    referrerMobile: ""
                                };
                            })
                        })
                    },
                    //*****ajaxMethod******//
                    getPointPerDay: function () {
                        $.ajax({
                            url: $.apiUrl + "/score",
                            type: "GET"
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("领取成功！");
                                m.getUserInfo();
                            });
                        });
                    },
                    createSpendpointQRcode: function () {
                        $.ajax({
                            url: $.apiUrl + "/order/shoppingoffline",
                            type: "PUT",
                            data: JSON.stringify({
                                "goodsName": vcustomer.spendpoint.name,
                                "goodsKind": vcustomer.spendpoint.type,
                                "userMobile": vcustomer.spendpoint.mobile,
                                "score": vcustomer.spendpoint.point,
                                "quantity": vcustomer.spendpoint.count,
                                "totalPrice": vcustomer.spendpoint.total
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                var url = "http://www.hnylbsc.com/spendpoint.html?oid=" + d.data;
                                $('#spendpoint-qrcode').qrcode({
                                    render: "table",
                                    width: 240,
                                    height: 240,
                                    text: url
                                });
                            })
                        });
                    }
                }
            });
            m.createQRcode();
        }
    };
    m.init();
})();