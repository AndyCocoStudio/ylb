(function ($) {
	"use strict";
	$.apiUrl = "/api";
	/**
	 * errCode处理
	 * **/
	$.ylbError = function (code) {
		if (code === 1001) {
			//登陆
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
        // setTimeout(function () {
        //     alertHtml.remove();
        // }, delay);
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
})(jQuery);
(function () {
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
	var lists = new Vue({
		el: "#ylb-layout",
		data: {
			sc: ""
		},
		methods: {
			search: function () {
				if (this.sc) location.href = "/list.html?n=" + this.sc;
				else location.href = "/list.html";
			}
		}
	})
})();