(function () {
    var vcustomer = {
        covershow: false,
        sendshow: false,
        spendshow: false,
        applyrole: -1,
        nagtive: false,
        sid: $.getID(),
        appID: "",
        order: [],
        jfdh: true,
        xsxf: false,
        sjzd: false,
        reason: "",
        role: "-1",
        plist: [],
        clist: [],
        alist: [],
        zdsh: true,
        jssh: false,
        fzdsh: false,
        fjssh: false,
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
            "idCard": "",
            "storeName": "",
            "province": "",
            "provinceCode": "",
            "city": "",
            "cityCode": "",
            "area": "",
            "areaCode": "",
            "street": "",
            "legalPerson": "",
            "legalPersonIDCardImage": [],//法人身份证
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
                maxFiles: 2,
                maxFilesize: 1.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobesaler.legalPersonIDCardImage.push(response.data);
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
                    if (vcustomer.info.role == "AreaManager") {
                        m.getApply();
                    } else {
                        m.getJFDHOrder();
                    }
                });
            });
        },
        getApply: function () {
            $.when($.ajax({
                url: $.apiUrl + "/applies?k=0",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.apply = d.data.applies;
                    m.getOrder();
                });
            });
        },
        getOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/givingscore",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.order = d.data.orders;
                    m.getXSXFOrder();
                });
            })
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
                        this.nagtive = false;
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
                    accepts: function (id) {
                        var c = confirm("确认同意该申请？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/apply/allow",
                                type: "POST",
                                data: JSON.stringify({
                                    applicationID: id
                                })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("操作成功");
                                    m.getApply();
                                });
                            });
                        }
                    },
                    selapprove: function (id) {
                        if (id == 1) {
                            vcustomer.zdsh = true;
                            vcustomer.jssh = false;
                            vcustomer.fzdsh = false;
                            vcustomer.fjssh = false;
                        } else if (id == 2) {
                            vcustomer.zdsh = false;
                            vcustomer.jssh = true;
                            vcustomer.fzdsh = false;
                            vcustomer.fjssh = false;
                        } else if (id == 3) {
                            vcustomer.zdsh = false;
                            vcustomer.jssh = false;
                            vcustomer.fzdsh = true;
                            vcustomer.fjssh = false;
                        } else if (id == 4) {
                            vcustomer.zdsh = false;
                            vcustomer.jssh = false;
                            vcustomer.fzdsh = false;
                            vcustomer.fjssh = true;
                        }
                    },
                    showreason: function (id) {
                        vcustomer.nagtive = true;
                        vcustomer.covershow = true;
                        vcustomer.appID = id;
                    },
                    reject: function () {
                        $.ajax({
                            url: $.apiUrl + "/apply/reject",
                            type: "POST",
                            data: JSON.stringify({
                                applicationID: vcustomer.appID,
                                reason: vcustomer.reason
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("操作成功");
                                vcustomer.nagtive = false;
                                vcustomer.covershow = false;
                                m.getApply();
                            });
                        });
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
                                vcustomer.tobesaler = {
                                    "referrerMobile": "",
                                    "idCard": "",
                                    "storeName": "",
                                    "province": "",
                                    "provinceCode": "",
                                    "city": "",
                                    "cityCode": "",
                                    "area": "",
                                    "areaCode": "",
                                    "street": "",
                                    "legalPerson": "",
                                    "legalPersonIDCardImage": [],//法人身份证
                                    "legalPersonWithIDCardInHandImage": "",//法人手持身份证照片
                                    "storeAppearance": "",//店招
                                    "storeInsideImages": [],//店铺内部图片
                                    "license": ""
                                }
                            });
                        });
                    },
                    cancel: function (id) {
                        var c = confirm("确认取消该订单？")
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/order/cancel?orderID=" + id,
                                type: "DELETE"
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("删除成功");
                                    m.getJFDHOrder();
                                });
                            })
                        }
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