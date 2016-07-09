(function ($) {
	"use strict";
	$.apiUrl = "/api";
	$.ajaxSetup({
        contentType: "application/json; charset=utf-8",
		beforeSend: function (request) {
			request.setRequestHeader("sid", $.getID());
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
					$.ylbAlert("找不到用户");
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
				default:
					$.ylbAlert("服务器又开小差");
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
		localStorage.setItem("sid", val);
	}
	$.getID = function () {
		return localStorage.getItem("sid");
	}
	$.clearID = function () {
		localStorage.removeItem("sid");
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
					window.location.href = "edit.html";
				}, 1500);
			};
		}
	}
})(jQuery);
(function () {
	/**
	 * 注销登录
	 * **/
	$(".logout").on("click", function () {
		$.clearID();
		$.localStorageHandler("clear", "flag");
		window.location.href = "login.html";
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
		sc: ""
	};
	var m = {
		init: function () {
			m.getFList();
		},
		getFList: function () {
			$.when($.ajax({
				url: $.apiUrl + "/goods/kinds",
				type: "GET"
			})).done(function (d) {
				$.ylbAjaxHandler(d, function () {
					layout.flist = d.data;
					m.getSList(layout.flist[0].code);
				});
			});
		},
		getSList: function (code) {
			$.when($.ajax({
				url: $.apiUrl + "/goods/kinds?code=" + code,
				type: "GET"
			})).done(function (d) {
				$.ylbAjaxHandler(d, function () {
					layout.slist = d.data;
					m.buildVue();
				});
			});
		},
		buildVue: function () {
			layout = new Vue({
				el: "#ylb-layout",
				data: layout,
				methods: {
					search: function () {
						if (this.sc) location.href = "list.html?n=" + this.sc;
						else location.href = "list.html";
					},
					changeslist: function (el) {
						var id = el.target.attributes["data-id"].value;
						m.getSList(id);
					}
				}
			})
		}
	};
	m.init();
})();