!function(){var n={},i={init:function(){i.getBanner(),$.checkFlag()},getBanner:function(){$.when($.ajax({url:$.apiUrl+"/banner",type:"GET"})).done(function(e){$.ylbAjaxHandler(e,function(){n.banner=e.data,i.buildVue()})})},buildVue:function(){n=new Vue({el:"#index-main",data:n}),i.setImages(),i.resizeWindow(),i.domControl()},setImages:function(){$(".index-main img").each(function(){var n=$(this),i=n.width(),e=n.height(),t=n.parent(),o=t.width(),a=t.height(),d=i/e,u=o/a;d>u?(n.height(a),n.width("auto")):(n.width(o),n.height("auto"))})},resizeWindow:function(){$(window).resize(function(){i.setImages()})},domControl:function(){$(".index-img").on({mouseover:function(){$(this).find("div").fadeOut()},mouseleave:function(){$(this).find("div").fadeIn()}})}};i.init()}();