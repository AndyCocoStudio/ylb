(function () {
    var vcustomer = {
        imgsize: 5.0,
        sz: 10,
        hcp: 1,
        ht: 0,
        scp: 1,
        st: 0,
        xcp: 1,
        xt: 0,
        zcp: 1,
        zt: 0,
        zczcp: 1,
        zczct: 0,
        cmcp: 1,
        cmt: 0,
        jscp: 1,
        jst: 0,
        zdcp: 1,
        zdt: 0,
        fjscp: 1,
        fjst: 0,
        fzdcp: 1,
        fzdt: 0,
        pcode: "",
        rcode: "",
        covershow: false,
        sendshow: false,
        spendshow: false,
        applyrole: -1,
        isapplyunder: false,
        isapplymanager: false,
        nagtive: false,
        ordernagtive: false,
        sid: $.getID(),
        counting: false,
        countdown: 0,
        num: 60,
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
        grefund: false,
        refundgoods: {},
        refundobj: {
            kind: "1",
            img: "",
            expressNum: "",
            expressCompany: "",
            reason: ""
        },
        zdsh: true,
        jssh: false,
        fzdsh: false,
        fjssh: false,
        zczc: false,
        zzsjzd: false,
        spendpoint: {
            name: "",
            type: "",
            count: "",
            total: "",
            point: "",
            mobile: ""
        },
        reward: {
            way: 1,//1货款2佣金3余额
            amount: 0,
            account: "",
            bank: ""
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
            // m.imgUpload();
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
            $("#tksmt").dropzone({
                init: function () {
                    this.on("removedfile", function (file) {
                        vcustomer.refundobj.img = "";
                    });
                },
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: vcustomer.imgsize, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.refundobj.img = response.data;
                }
            });
            $("#yyzz").dropzone({
                init: function () {
                    this.on("removedfile", function (file) {
                        vcustomer.tobesaler.license = "";
                    });
                },
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: vcustomer.imgsize, // MB
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
                maxFilesize: vcustomer.imgsize, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: false,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobesaler.legalPersonIDCardImage.push(response.data);
                }
            });
            $("#zmt").dropzone({
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: vcustomer.imgsize, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: false,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobesaler.legalPersonWithIDCardInHandImage = response.data;
                }
            });
            $("#dzt").dropzone({
                init: function () {
                    this.on("removedfile", function (file) {
                        vcustomer.tobesaler.storeAppearance = "";
                    });
                },
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: vcustomer.imgsize, // MB
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
                maxFilesize: vcustomer.imgsize, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: false,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobesaler.storeInsideImages.push(response.data);
                }
            });
            $("#areafr").dropzone({
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 2,
                maxFilesize: vcustomer.imgsize, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: false,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobearea.legalPersonIDCardImage.push(response.data);
                }
            });
            $("#areasfz").dropzone({
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: vcustomer.imgsize, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: false,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    vcustomer.tobearea.legalPersonWithIDCardInHandImage = response.data;
                }
            });
        },
        //生成做单二维码
        createQRcode: function () {
            var url = "http://www.hnylbsc.com/func.html?mobile=" + vcustomer.info.mobile;
            if (!vcustomer.pcode) {
                vcustomer.pcode = $('#customer-private-qrcode').qrcode({
                    render: "canvas",
                    width: 140,
                    height: 140,
                    text: url
                });
            }
            // if (!vcustomer.rcode) {
            //     var logonurl = "http://www.hnylbsc.com/logon.html?rid=" + vcustomer.info.mobile;
            //     vcustomer.rcode = $('#logon-qrcode').qrcode({
            //         //render: "canvas",
            //         width: 280,
            //         height: 280,
            //         text: logonurl,
            //         useSVG: true
            //     });
            // }
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
                    m.getJFDHOrder();
                });
            });
        },
        //获取积分兑换订单列表
        getJFDHOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/orders?k=1&cp=" + vcustomer.hcp + "&sz=" + vcustomer.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.jfdhlist = d.data.orders;
                    vcustomer.ht = d.data.totalCount;
                    m.getXSXFOrder();
                });
            });
        },
        //获取线上消费订单列表
        getXSXFOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/orders?k=2&cp=" + vcustomer.xcp + "&sz=" + vcustomer.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.xsxflist = d.data.orders;
                    vcustomer.xt = d.data.totalCount;
                    m.getSJZDOrder();
                });
            });
        },
        //获取普通会员做单订单列表
        getSJZDOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/orders?k=0&cp=" + vcustomer.scp + "&sz=" + vcustomer.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.sjzdlist = d.data.orders;
                    vcustomer.st = d.data.totalCount;
                    m.getZZSJZDOrder();
                });
            });
        },
        getZZSJZDOrder: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/orders?k=3&cp=" + vcustomer.zcp + "&sz=" + vcustomer.sz,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    vcustomer.zzsjzdlist = d.data.orders;
                    vcustomer.zt = d.data.totalCount;
                    if (vcustomer.info.role == 'CustomerManager' || vcustomer.info.role == 'AreaManager' || vcustomer.info.role == 'AM' || vcustomer.info.role == 'CM') {
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
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            vcustomer = new Vue({
                el: "#customer-main",
                data: vcustomer,
                methods: {
                    tprev: function () {
                        if (vcustomer.hcp <= 1) {
                            return;
                        } else {
                            vcustomer.hcp = +vcustomer.hcp - 1;
                            m.getJFDHOrder();
                        }
                    },
                    tnext: function () {
                        if (vcustomer.hcp >= Math.ceil(vcustomer.ht / vcustomer.sz)) {
                            return;
                        } else {
                            vcustomer.hcp = +vcustomer.hcp + 1;
                            m.getJFDHOrder();
                        }
                    },
                    tjump: function () {
                        if (vcustomer.hcp >= Math.ceil(vcustomer.ht / vcustomer.sz)) vcustomer.hcp = Math.ceil(vcustomer.ht / vcustomer.sz);
                        if (vcustomer.hcp <= 1) vcustomer.hcp = 1;
                        m.getJFDHOrder();
                    },
                    xprev: function () {
                        if (vcustomer.xcp <= 1) {
                            return;
                        } else {
                            vcustomer.xcp = +vcustomer.xcp - 1;
                            m.getXSXFOrder();
                        }
                    },
                    xnext: function () {
                        if (vcustomer.xcp >= Math.ceil(vcustomer.xt / vcustomer.sz)) {
                            return;
                        } else {
                            vcustomer.xcp = +vcustomer.xcp + 1;
                            m.getXSXFOrder();
                        }
                    },
                    xjump: function () {
                        if (vcustomer.xcp >= Math.ceil(vcustomer.xt / vcustomer.sz)) vcustomer.xcp = Math.ceil(vcustomer.xt / vcustomer.sz);
                        if (vcustomer.xcp <= 1) vcustomer.xcp = 1;
                        m.getXSXFOrder();
                    },
                    sprev: function () {
                        if (vcustomer.scp <= 1) {
                            return;
                        } else {
                            vcustomer.scp = +vcustomer.scp - 1;
                            m.getSJZDOrder();
                        }
                    },
                    snext: function () {
                        if (vcustomer.scp >= Math.ceil(vcustomer.st / vcustomer.sz)) {
                            return;
                        } else {
                            vcustomer.scp = +vcustomer.scp + 1;
                            m.getSJZDOrder();
                        }
                    },
                    sjump: function () {
                        if (vcustomer.scp >= Math.ceil(vcustomer.st / vcustomer.sz)) vcustomer.scp = Math.ceil(vcustomer.st / vcustomer.sz);
                        if (vcustomer.scp <= 1) vcustomer.scp = 1;
                        m.getSJZDOrder();
                    },
                    zprev: function () {
                        if (vcustomer.zcp <= 1) {
                            return;
                        } else {
                            vcustomer.zcp = +vcustomer.zcp - 1;
                            m.getZZSJZDOrder();
                        }
                    },
                    znext: function () {
                        if (vcustomer.zcp >= Math.ceil(vcustomer.zt / vcustomer.sz)) {
                            return;
                        } else {
                            vcustomer.zcp = +vcustomer.zcp + 1;
                            m.getZZSJZDOrder();
                        }
                    },
                    zjump: function () {
                        if (vcustomer.zcp >= Math.ceil(vcustomer.zt / vcustomer.sz)) vcustomer.zcp = Math.ceil(vcustomer.zt / vcustomer.sz);
                        if (vcustomer.zcp <= 1) vcustomer.zcp = 1;
                        m.getZZSJZDOrder();
                    },
                    //选择订单列表
                    selectorder: function (t) {
                        switch (t) {
                            case 1:
                                vcustomer.jfdh = true;
                                vcustomer.sjzd = false;
                                vcustomer.xsxf = false;
                                vcustomer.zzsjzd = false;
                                break;
                            case 2:
                                vcustomer.jfdh = false;
                                vcustomer.sjzd = false;
                                vcustomer.xsxf = true;
                                vcustomer.zzsjzd = false;
                                break;
                            case 3:
                                vcustomer.jfdh = false;
                                vcustomer.sjzd = true;
                                vcustomer.xsxf = false;
                                vcustomer.zzsjzd = false;
                                break;
                            case 4:
                                vcustomer.jfdh = false;
                                vcustomer.sjzd = false;
                                vcustomer.xsxf = false;
                                vcustomer.zzsjzd = true;
                                break;
                            default:
                                vcustomer.jfdh = true;
                                vcustomer.sjzd = false;
                                vcustomer.xsxf = false;
                                vcustomer.zzsjzd = false;
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
                        this.grefund = false;
                        this.ordernagtive = false;
                        this.zczc = false;
                    },
                    //积分兑换可用积分数限制
                    pchange: function () {
                        if (this.spendpoint.point > this.spendpoint.total) {
                            this.spendpoint.point = this.spendpoint.total.toFixed(2);
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
                                var url = "http://www.hnylbsc.com/pay.html?oid=" + d.data;
                                $('#spendpoint-qrcode').qrcode({
                                    render: "canvas",
                                    width: 240,
                                    height: 240,
                                    text: url
                                });
                            })
                        });
                    },
                    //显示拒绝理由
                    showreject: function (t) {
                        alert(t);
                    },
                    //检测积分对象是否是自己
                    setobj: function (el) {
                        if (el.target.value == vcustomer.info.mobile) {
                            $.ylbAlert("该手机号码不可用");
                            $(el.target).focus();
                        }
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
                    //选择转出资产类型
                    changerewardway: function (el) {
                        var v = $(el.target).find("option:selected").val();
                        vcustomer.reward.way = v;
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
                        if (vcustomer.isapplyunder) {
                            if (!vcustomer.tobesaler.idCard) {
                                $.ylbAlert("请输入法人身份证号");
                                return;
                            }
                            if (!vcustomer.tobesaler.storeName) {
                                $.ylbAlert("请输入店铺名称");
                                return;
                            }
                            if (!vcustomer.tobesaler.province) {
                                $.ylbAlert("请选择省");
                                return;
                            }
                            if (!vcustomer.tobesaler.city) {
                                $.ylbAlert("请选择市");
                                return;
                            }
                            if (!vcustomer.tobesaler.area) {
                                $.ylbAlert("请选择区");
                                return;
                            }
                            if (!vcustomer.tobesaler.street) {
                                $.ylbAlert("请输入详细街道地址");
                                return;
                            }
                            if (!vcustomer.tobesaler.legalPerson) {
                                $.ylbAlert("请输入真实姓名");
                                return;
                            }
                            // if (vcustomer.tobesaler.legalPersonIDCardImage.length < 1) {
                            //     $.ylbAlert("请上传身份证正反面照");
                            //     return;
                            // }
                            // if (!vcustomer.tobesaler.legalPersonWithIDCardInHandImage) {
                            //     $.ylbAlert("请上传法人手持身份证照");
                            //     return;
                            // }
                            if (vcustomer.tobesaler.storeInsideImages.length < 1) {
                                $.ylbAlert("请上传店铺内饰图");
                                return;
                            }
                            if (!vcustomer.tobesaler.storeAppearance) {
                                $.ylbAlert("请上传店招图");
                                return;
                            }
                            if (!vcustomer.tobesaler.license) {
                                $.ylbAlert("请上传营业执照图");
                                return;
                            }
                            $.ajax({
                                url: $.apiUrl + "/user/merchant",
                                type: "PUT",
                                data: JSON.stringify(vcustomer.tobesaler)
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("申请成功！");
                                    // vcustomer.tobesaler = {
                                    //     "referrerMobile": "",
                                    //     "idCard": "",
                                    //     "storeName": "",
                                    //     "province": "",
                                    //     "provinceCode": "",
                                    //     "city": "",
                                    //     "cityCode": "",
                                    //     "area": "",
                                    //     "areaCode": "",
                                    //     "street": "",
                                    //     "legalPerson": "",
                                    //     "legalPersonIDCardImage": [],//法人身份证
                                    //     "legalPersonWithIDCardInHandImage": "",//法人手持身份证照片
                                    //     "storeAppearance": "",//店招
                                    //     "storeInsideImages": [],//店铺内部图片
                                    //     "license": ""
                                    // }
                                    setTimeout(function () {
                                        window.location.href = window.location.href;
                                    }, 1500);
                                });
                            });
                        } else {
                            $.ylbAlert("阅读地面商家加盟合作条款并勾选已读");
                        }
                    },
                    //申请客户经理
                    apymanager: function () {
                        if (vcustomer.isapplymanager) {
                            if (!vcustomer.tobearea.applicantName) {
                                $.ylbAlert("请输入申请人姓名");
                                return;
                            }
                            if (!vcustomer.tobearea.province) {
                                $.ylbAlert("请选择省");
                                return;
                            }
                            if (!vcustomer.tobearea.city) {
                                $.ylbAlert("请选择市");
                                return;
                            }
                            if (!vcustomer.tobearea.area) {
                                $.ylbAlert("请选择区");
                                return;
                            }
                            if (vcustomer.tobearea.legalPersonIDCardImage.length < 1) {
                                $.ylbAlert("请上传身份证正反面照");
                                return;
                            }
                            // if (!vcustomer.tobearea.legalPersonWithIDCardInHandImage) {
                            //     $.ylbAlert("请上传法人手持身份证照");
                            //     return;
                            // }
                            if (!vcustomer.tobearea.idCard) {
                                $.ylbAlert("请输入法人身份证号");
                                return;
                            }
                            $.ajax({
                                url: $.apiUrl + "/user/customermanager",
                                type: "PUT",
                                data: JSON.stringify(vcustomer.tobearea)
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("申请成功！");
                                    // vcustomer.tobearea = {
                                    //     "applicantName": "",
                                    //     "province": "",
                                    //     "provinceCode": "",
                                    //     "city": "",
                                    //     "cityCode": "",
                                    //     "street": "",
                                    //     "area": "",
                                    //     "areaCode": "",
                                    //     "idCard": "",
                                    //     "legalPersonIDCardImage": [],
                                    //     "legalPersonWithIDCardInHandImage": ""
                                    // }
                                    setTimeout(function () {
                                        window.location.href = window.location.href;
                                    }, 1500);
                                });
                            });
                        } else {
                            $.ylbAlert("阅读地面商家加盟合作条款并勾选已读");
                        }
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
                    //充值
                    recharge: function () {
                        $.ylbConfirm({
                            msg: "请输入充值金额<input type='text' class='recharge'>",
                            callback: function () {
                                var money = $(".recharge").val();
                                $.ajax({
                                    url: $.apiUrl + '/order/recharge',
                                    type: "PUT",
                                    data: JSON.stringify({ amount: money })
                                }).done(function (d) {
                                    $.ylbAjaxHandler(d, function () {
                                        window.location.href = "pay.html?oid=" + d.data;
                                    })
                                })
                            }
                        })
                    },
                    //显示转出资产弹层
                    rewards: function () {
                        vcustomer.zczc = true;
                        vcustomer.covershow = true;
                    },
                    //阅读地面商家加盟合作条款
                    selunder: function (el) {
                        vcustomer.isapplyunder = $(el.target).is(":checked");
                    },
                    selmanager: function (el) {
                        vcustomer.isapplymanager = $(el.target).is(":checked");
                    },
                    //转出资产
                    dorewards: function () {
                        var url = "";
                        switch (vcustomer.reward.way) {
                            case "1":
                                url = "/transfer/paymentforgoods";
                                break;
                            case "2":
                                url = "/transfer/commission";
                                break;
                            case "3":
                                url = "/transfer/balance";
                                break;
                            default:
                                url = "/transfer/paymentforgoods";
                                break;
                        }
                        if (!vcustomer.reward.amount) {
                            $.ylbAlert("请输入转出金额");
                            return;
                        }
                        if (!vcustomer.reward.account) {
                            $.ylbAlert("请输入账号");
                            return;
                        }
                        $.ajax({
                            url: $.apiUrl + url,
                            type: "PUT",
                            data: JSON.stringify({
                                amount: vcustomer.reward.amount,
                                account: vcustomer.reward.account,
                                bank: vcustomer.reward.bank
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("转出申请成功");
                                vcustomer.hideall();
                                setTimeout(function () {
                                    window.location.href = window.location.href;
                                }, 1500);
                            });
                        });
                    },
                    //确认收货
                    getgoods: function (id) {
                        var c = confirm("确认收货？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/order/receive",
                                type: "POST",
                                data: JSON.stringify({ orderID: id })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("操作成功");
                                    m.getXSXFOrder();
                                });
                            });
                        }
                    },
                    //选择退款类型
                    selrefundkind: function (el) {
                        var t = $(el.target).find("option:selected").val();
                        vcustomer.refundobj.kind = t;
                    },
                    //显示退款弹窗
                    showrefund: function (el) {
                        var _this = $(el.target);
                        var tindex = _this.attr("data-index");
                        var oindex = _this.parent().parent().parent().parent().parent().parent().attr("data-index");
                        vcustomer.refundobj = vcustomer.xsxflist[oindex];
                        vcustomer.refundobj.kind = "1";
                        vcustomer.refundobj.img = "";
                        vcustomer.refundobj.expressNum = "";
                        vcustomer.refundobj.expressCompany = "";
                        vcustomer.refundobj.reason = "";
                        vcustomer.refundgoods = vcustomer.refundobj.items[tindex];
                        $.when($.ajax({
                            url: $.apiUrl + "/order/refund/freight?oid=" + vcustomer.refundobj.orderID,
                            type: "GET"
                        })).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                vcustomer.refundobj.freight = d.data.freight;
                                vcustomer.covershow = true;
                                vcustomer.grefund = true;
                            });
                        });
                    },
                    //申请退款
                    refundgoods: function () {
                        var c = confirm("确认退款？");
                        if (c) {
                            $.ajax({
                                url: $.apiUrl + "/order/refund",
                                type: "POST",
                                data: JSON.stringify({
                                    orderID: vcustomer.refundobj.orderID,
                                    orderItemID: vcustomer.refundobj.items[tindex].orderItemID,
                                    amount: vcustomer.refundobj.items[tindex].price,
                                    freight: vcustomer.refundobj.freight,
                                    kind: vcustomer.refundobj.kind,
                                    expressCompany: vcustomer.refundobj.expressCompany,
                                    expressNum: vcustomer.refundobj.expressNum,
                                    reason: vcustomer.refundobj.reason,
                                    images: "[" + vcustomer.refundobj.img + "]"
                                })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("操作成功");
                                    m.getXSXFOrder();
                                });
                            });
                        }
                    },
                }
            });
            m.createQRcode();
            setTimeout(m.imgUpload(), 300);
        },
        countDown: function () {
            //## 再次获取验证码倒计时
            if (vcustomer.num > 1) {
                vcustomer.num -= 1;
                $(".btn-code").val(vcustomer.num + "秒后重新获取");
            } else {
                vcustomer.counting = false;
                $(".btn-code").val("重新获取");
                vcustomer.num = 60;
                clearInterval(vcustomer.countdown);
            }
        }
    };
    m.init();
})();