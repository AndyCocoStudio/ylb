!function(){var i={init:function(){i.setScreenHeight(),i.resizeWindow()},setScreenHeight:function(){$(".detail-wrap, .detail-img, .detail-buy").height(+$(window).height()-132)},resizeWindow:function(){$(window).resize(function(){i.setScreenHeight()})}};i.init()}();