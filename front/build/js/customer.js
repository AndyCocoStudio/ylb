(function () {
    var vcustomer = {
        covershow: false,
        sendshow: false,
        spendshow: false,
        applyrole: -1,
        nagtive: false,
        ordernagtive: false,
        sid: $.getID(),
        appID: "",
        order: [],
        jfdh: true,
        xsxf: false,
        sjzd: false,
        reason: "",
        orderreason: "",
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
        },
        tobearea: {
            "street": "",
            "applicantName": "",
            "province": "",
            "provinceCode": "",
            "city": "",
            "cityCode": "",
            "area": "",
            "areaCode": "",
            "idCard": "",
            "legalPersonIDCardImage": [],
            "legalPersonWithIDCardInHandImage": ""
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
        // 获取省
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
        //获取市
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
        //获取区
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
        //图片上传初始化
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
            $("#areafr").dropzone({
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 2,
                maxFilesize: 4.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobearea.legalPersonIDCardImage.push(response.data);
                }
            });
            $("#areasfz").dropzone({
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: 4.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobearea.legalPersonWithIDCardInHandImage = response.data;
                }
            });
        },
        //生成做单二维码
        createQRcode: function () {
            var url = "http://www.hnylbsc.com/sendpoint.html?uid=" + vcustomer.info.mobile;
            $('#customer-private-qrcode').qrcode({
                render: "canvas",
                width: 140,
                height: 140,
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
                    vcustomer.tj.referrerMobile = d.data.mobile;
                    if (vcustomer.info.role == "AreaManager") {
                        m.getApply();
                    } else {
                        m.getJFDHOrder();
                    }
                });
            });
        },
        //获取角色申请列表
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
        //获取做单申请列表
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
        //获取积分兑换订单列表
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
        //获取线上消费订单列表
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
        //获取商家做单订单列表
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
        //计算工资小计
        getTotal: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/wage",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.total = d.data;
                    if (vcustomer.info.role == 'CustomerManager') {
                        m.getOrders();
                    }
                    else m.buildVue();
                });
            });
        },
        //获取客户经理名下商家做单列表
        getOrders: function () {
            $.when($.ajax({
                url: $.apiUrl + "/customermanager/givingscore",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.customerorders = d.data;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            vcustomer = new Vue({
                el: "#customer-main",
                data: vcustomer,
                methods: {
                    //选择订单列表
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
                    //显示积分做单窗口
                    sendpoints: function () {
                        this.covershow = true;
                        this.sendshow = true;
                    },
                    //显示积分兑换窗口
                    spendpoints: function () {
                        this.covershow = true;
                        this.spendshow = true;
                    },
                    //隐藏所有弹层
                    hideall: function () {
                        this.covershow = false;
                        this.sendshow = false;
                        this.spendshow = false;
                        this.nagtive = false;
                        this.ordernative = false;
                    },
                    //积分兑换可用积分数限制
                    pchange: function () {
                        if (this.spendpoint.point > this.spendpoint.total * 0.8) {
                            this.spendpoint.point = (this.spendpoint.total * 0.8).toFixed(2);
                        }
                    },
                    //创建积分兑换二维码
                    getqrcode: function () {
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
                    },
                    //领取积分
                    getpoint: function () {
                        $.ajax({
                            url: $.apiUrl + "/score",
                            type: "GET"
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("领取成功！");
                                m.getUserInfo();
                            });
                        });;
                    },
                    //同意角色申请
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
                    //切换审批列表
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
                    //显示拒绝理由
                    showreason: function (id) {
                        vcustomer.nagtive = true;
                        vcustomer.covershow = true;
                        vcustomer.appID = id;
                    },
                    //查看做单拒绝理由
                    showrejectreason: function (msg) {
                        alert(msg);
                    },
                    //拒绝角色申请
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
                                vcustomer.hideall();
                                m.getApply();
                            });
                        });
                    },
                    //申请角色切换
                    rolechange: function (el) {
                        vcustomer.role = $(el.target).val();
                    },
                    //切换省
                    changeprov: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        vcustomer.tobesaler.provinceCode = v;
                        vcustomer.tobesaler.province = t;
                        vcustomer.tobearea.provinceCode = v;
                        vcustomer.tobearea.province = t;
                        vcustomer.alist = [];
                        m.getCity(v);
                    },
                    //切换市
                    changecity: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        vcustomer.tobesaler.cityCode = v;
                        vcustomer.tobesaler.city = t;
                        vcustomer.tobearea.cityCode = v;
                        vcustomer.tobearea.city = t;
                        m.getArea(v);
                    },
                    //切换区
                    changearea: function (el) {
                        var _this = $(el.target);
                        var v = _this.val();
                        var t = _this.find("option:selected").text();
                        vcustomer.tobesaler.areaCode = v;
                        vcustomer.tobesaler.area = t;
                        vcustomer.tobearea.areaCode = v;
                        vcustomer.tobearea.area = t;
                    },
                    //申请加盟商
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
                    //申请客户经理
                    apymanager: function () {
                        $.ajax({
                            url: $.apiUrl + "/user/customermanager",
                            type: "PUT",
                            data: JSON.stringify(vcustomer.tobearea)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("申请成功！");
                                vcustomer.tobearea = {
                                    "applicantName": "",
                                    "province": "",
                                    "provinceCode": "",
                                    "city": "",
                                    "cityCode": "",
                                    "street": "",
                                    "area": "",
                                    "areaCode": "",
                                    "idCard": "",
                                    "legalPersonIDCardImage": [],
                                    "legalPersonWithIDCardInHandImage": ""
                                }
                            });
                        })
                    },
                    //取消订单
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
                    //加盟商注册用户
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
                    //显示拒绝做单申请理由
                    showorderreason: function (id) {
                        vcustomer.orderID = id;
                        this.cover = true;
                        this.ordernagtive = true;
                    },
                    //同意做单申请
                    agreeorder: function (id) {
                        var c = confirm("确认同意该申请？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/givingscore/agree",
                                type: "POST",
                                data: JSON.stringify({
                                    orderID: id
                                })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("操作成功");
                                    m.getOrder();
                                });
                            });
                        }
                    },
                    //不同意做单申请
                    disagreeorder: function () {
                        $.ajax({
                            url: $.apiUrl + "/givingscore/reject",
                            type: "POST",
                            data: JSON.stringify({
                                orderID: vcustomer.orderID,
                                reason: vcustomer.orderreason
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("操作成功");
                                vcustomer.hideall();
                                m.getOrder();
                            });
                        });
                    }
                }
            });
            m.createQRcode();
        }
    };
    m.init();
})();