!function(){var n={init:function(){setInterval(n.bannerAnimate,4e3)},bannerAnimate:function(){var n,e=$(".list-banner").find(".select"),i=$(".list-banner li").length,t=e.index();n=t>=i-1?$(".list-banner li:first-child"):e.next("li"),e.fadeOut().removeClass("select"),n.addClass("select").fadeIn()}};n.init()}();