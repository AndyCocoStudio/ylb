(function ($) {
	"use strict";
	$.apiUrl = "/api";
	$.ajaxSetup({
        contentType: "application/json; charset=utf-8",
		beforeSend: function (request) {
			request.setRequestHeader("osid", $.getID());
		}
    });
	/**
	 * 检查session
	 * **/
	$.checkSession = function () {
		var sid = $.getID();
		var url = window.location.href;
		if (!sid) window.location.href = "login.html?url=" + url;
	}
	/**
	 * errCode处理
	 * **/
	$.ylbError = function (code) {
		if (code === "1001") {
			//登陆
			$.clearID();
			var url = window.location.href;
			window.location.href = "login.html?url=" + url;
		} else if (code === 2001) {
			$.ylbAlert("服务器开小差了,请稍后重试...");
		} else {
			switch (code) {
				case "4001":
					$.ylbAlert("验证码错误");
					break;
				case "4002":
					$.ylbAlert("验证码过期");
					break;
				case "4003":
					$.ylbAlert("抵扣的积分超过允许上限");
					break;
				case "4004":
					$.ylbAlert("没有足够的积分用来抵扣");
					break;
				case "4005":
					$.ylbAlert("该用户尚未注册");
					break;
				case "4006":
					$.ylbAlert("查询不到商品");
					break;
				case "4007":
					$.ylbAlert("已支付的订单不能取消");
					break;
				case "4008":
					$.ylbAlert("暂无可领取积分");
					break;
				case "4009":
					$.ylbAlert("领取积分失败");
					break;
				case "4010":
					$.ylbAlert("积分点为0");
					break;
				case "4011":
					$.ylbAlert("余额转出申请已处理");
					break;
				case "4012":
					$.ylbAlert("账户金额不足");
					break;
				case "4013":
					$.ylbAlert("不能重复申请");
					break;
				case "4014":
					$.ylbAlert("该手机已经注册");
					break;
				case "4015":
					$.ylbAlert("原密码输入错误");
					break;
				case "4016":
					$.ylbAlert("推荐会员人数不足");
					break;
				case "4017":
					$.ylbAlert("本时间段不可领取积分");
					break;
				case "4018":
					$.ylbAlert("违规操作");
					break;
				case "4019":
					$.ylbAlert("申请已经处理");
					break;
				case "4020":
					$.ylbAlert("该区域已有区域经理");
					break;
				case "4021":
					$.ylbAlert("该账号非加盟商");
					break;
				case "4022":
					$.ylbAlert("该账号已经是区域经理/客户经理");
					break;
				default:
					$.ylbAlert("服务器又开小差(error:" + code + ")");
					break;
			}
		}
	};
	/**
	 * Ajax结果处理
	 * **/
	$.ylbAjaxHandler = function (data, succ, fail) {
		if (data.result) {
			succ();
		} else {
			$.ylbError(data.error);
			if (fail) fail();
		}
	};
	/**
	 * 弹窗提示
	 * **/
	$.ylbAlert = function (msg, delay) {
		var left = ($(window).width() - 240) / 2;
        delay = (delay || 1500);
        var alertDom = ['<div class="ylb-alert">', msg, '</div>'];
        var alertHtml = $(alertDom.join('')).css('left', left).appendTo('body');
        alertHtml.show();
        setTimeout(function () {
            alertHtml.remove();
        }, delay);
	};
	/**
	 * 获取url参数
	 * **/
	$.urlParam = function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        try {
            var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
            if (!results) {
                return "";
            }
            return results[1] || "";
        } catch (e) {
            return "";
        }
    };
	/**
	 * 获取url中跳转url
	 * **/
	$.regexUrl = function (url) {
        //正则出url
		if (!url) url = window.location.href;
        var strs = new Array(); //定义一数组
        strs = url.split("?url="); //字符分割
        if (strs[1]) {
            return strs[1];
        } else {
            strs = url.split("&url=");
            return strs[1];
        }
    };
	/**
	 * LocalStorage处理
	 * **/
	$.localStorageHandler = function (method, key, val) {
		switch (method) {
			case "set":
				localStorage.setItem(key, val);
				break;
			case "get":
				return localStorage.getItem(key);
			//break;
			case "clear":
				localStorage.removeItem(key);
				break;
			case "clearall":
				localStorage.clear();
				break;
		}
	};
	/**
	 * 存储sessionID
	 * **/
	$.setID = function (val) {
		localStorage.setItem("osid", val);
	}
	$.getID = function () {
		return localStorage.getItem("osid");
	}
	$.clearID = function () {
		localStorage.removeItem("osid");
	}
	/**
	 * json和string互换
	 * **/
	$.parseHandler = function (method, val) {
		switch (method) {
			case "js":
				return JSON.stringify(val);
			case "sj":
				return $.parseJSON(val);
		}
	};
	/**
	 * localStorage购物车
	 * **/
	$.ylbAddCart = function (name, val) {
		var sv = $.localStorageHandler("get", name);
		if (!sv) {
			$.localStorageHandler("set", name, "[" + $.parseHandler("js", val) + "]");
			$.ylbAlert("添加成功");
		} else {
			var jv = $.parseHandler("sj", sv);
			var isContain = false;
			for (var i = 0, j = jv.length; i < j; i++) {
				if (jv[i].goodsID == val.goodsID) {
					isContain = true;
					break;
				}
			}
			if (isContain) {
				$.ylbAlert("商品已添加购物车");
			} else {
				val = "[" + sv.substring(1, sv.length - 1) + "," + $.parseHandler("js", val) + "]";
				$.localStorageHandler("set", name, val);
				$.ylbAlert("添加成功");
			}
		}
	};
	$.ylbRemoveCart = function (name, id) {
		var sv = $.localStorageHandler("get", name);
		var jv = $.parseHandler("sj", sv);
		var sn = "";
		for (var i = 0, j = jv.length; i < j; i++) {
			if (jv[i].goodsID == id) {
				continue;
			} else {
				sn += $.parseHandler("js", jv[i]) + ",";
			}
		}
		sn = "[" + sn.substring(0, sn.length - 1) + "]";
		$.localStorageHandler("set", name, sn);
	}
	/**
	 * 检查登录账号是否设置2级密码
	 * **/
	$.checkFlag = function () {
		if ($.getID()) {
			if ($.localStorageHandler("get", "flag") == "false") {
				$.ylbAlert("为了您的账号安全，请设置支付密码");
				setTimeout(function () {
					window.location.href = "edit.html?url=" + window.location.href;
				}, 1500);
			};
		}
	}
	/**
	 * 检测是否是手机号码
	 * **/
	$.checkIsMobileNumber = function (number) {
        var reg = /^1\d{10}$/;
        return reg.test(number);
    }
	$.ylbConfirm = function (config) {
        var defs = {
            type: 'confirm',
            msg: '',
            callback: function () { },
            navCallback: function () { }
        };
        $.extend(defs, config);
        var html = '<div class="ylb-confirm-cover"></div>',
            btns = '';
        if (defs.type === 'confirm') {
            btns += '<input type="button" class="btn-cancel" value="取消">'
                + '<input type="button" class="btn-yes" value="确认">';
        } else {
            btns += '<input type="button" class="btn-yes" value="确认">';
        }
        html += '<div class="ylb-confirm">'
            + '<h4 class="confirm-tit">提示</h4>'
            + '<p class="confirm-msg">' + defs.msg + '</p>'
            + '<div class="confirm-group">' + btns
            + '</div></div>';
        $('body').append(html);
        $('.ylb-confirm-cover').show();
        var scrollTop = window.pageYOffset //用于FF
            || document.documentElement.scrollTop
            || document.body.scrollTop
            || 0;
        $('.ylb-confirm').css('margin-top', (+scrollTop - 40) + 'px');
        $('body').delegate('.btn-cancel', 'click', function () {
            $('.ylb-confirm-cover').remove();
            $('.ylb-confirm').remove();
            $('body').undelegate();
            defs.navCallback();
        });
        $('body').delegate('.btn-yes', 'click', function () {
			defs.callback();
            $('.ylb-confirm-cover').remove();
            $('.ylb-confirm').remove();
            $('body').undelegate();
        });
    };
})(jQuery);
(function () {
	/**
	 * 注销登录
	 * **/
	$(".logout").on("click", function () {
		if (layout.islogin) {
			$.clearID();
			$.localStorageHandler("clear", "flag");
			window.location.href = "login.html";
		} else {
			window.location.href = "login.html";
		}
	});
    /** 
	 * 搜索效果
	 * **/
	$(".ylb-search").on("click", function () {
		$(".ylb-cover").fadeIn();
		$(".ylb-search-wrap").fadeIn();
	});
	/** 
	 * 分类效果
	 * **/
	$(".ylb-menu").on("click", function () {
		$(".ylb-cover").fadeIn();
		$(".ylb-menu-wrap").fadeIn();
	});
	/**
	 * 关闭所有弹窗
	 * **/
	$(".ylb-cover, .ylb-menu-wrap").on("click", function () {
		$(".ylb-cover").fadeOut();
		$(".ylb-search-wrap").fadeOut();
		$(".ylb-menu-wrap").fadeOut();
	});
	var layout = {
		islogin: $.getID || false,
	};
	var m = {
		init: function () {
			m.buildVue();
		},
		buildVue: function () {
			layout = new Vue({
				el: "#layout-main",
				data: layout,
				methods: {
					logout: function () {
						$.clearID();
						window.location.href = "login.html";
					}
				}
			})
		}
	};
	m.init();
})();