(function ($) {
	"use strict";

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
	$(".ylb-cover").on("click",function(){
		$(".ylb-cover").fadeOut();
		$(".ylb-search-wrap").fadeOut();
		$(".ylb-menu-wrap").fadeOut();
	});
})();