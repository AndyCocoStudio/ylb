(function ($) {
	"use strict";

})(jQuery);
(function () {
    /** 
	 * 搜索效果
	 * **/
	$(".ylb-search").on("click", function () {
		$(".ylb-search-cover").fadeIn();
		$(".ylb-search-wrap").fadeIn();
	});
	$(".ylb-search-cover").on("click",function(){
		$(".ylb-search-cover").fadeOut();
		$(".ylb-search-wrap").fadeOut();
	});
})();