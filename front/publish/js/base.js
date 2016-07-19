!function(e){"use strict";e.apiUrl="/api",e.ajaxSetup({contentType:"application/json; charset=utf-8",beforeSend:function(l){l.setRequestHeader("sid",e.getID())}}),e.checkSession=function(){var l=e.getID(),t=window.location.href;l||(window.location.href="login.html?url="+t)},e.ylbError=function(l){if("1001"===l){e.clearID();var t=window.location.href;window.location.href="login.html?url="+t}else if(2001===l)e.ylbAlert("服务器开小差了,请稍后重试...");else switch(l){case"4001":e.ylbAlert("验证码错误");break;case"4002":e.ylbAlert("验证码过期");break;case"4003":e.ylbAlert("抵扣的积分超过允许上限");break;case"4004":e.ylbAlert("没有足够的积分用来抵扣");break;case"4005":e.ylbAlert("该用户尚未注册");break;case"4006":e.ylbAlert("查询不到商品");break;case"4007":e.ylbAlert("已支付的订单不能取消");break;case"4008":e.ylbAlert("暂无可领取积分");break;case"4009":e.ylbAlert("领取积分失败");break;case"4010":e.ylbAlert("积分点为0");break;case"4011":e.ylbAlert("余额转出申请已处理");break;case"4012":e.ylbAlert("账户金额不足");break;case"4013":e.ylbAlert("不能重复申请");break;case"4014":e.ylbAlert("该手机已经注册");break;case"4015":e.ylbAlert("原密码输入错误");break;case"4016":e.ylbAlert("推荐会员人数不足");break;case"4017":e.ylbAlert("本时间段不可领取积分");break;case"4018":e.ylbAlert("违规操作");break;default:e.ylbAlert("服务器又开小差")}},e.ylbAjaxHandler=function(l,t,a){l.result?t():(e.ylbError(l.error),a&&a())},e.ylbAlert=function(l,t){var a=(e(window).width()-240)/2;t=t||1500;var n=['<div class="ylb-alert">',l,"</div>"],r=e(n.join("")).css("left",a).appendTo("body");r.show(),setTimeout(function(){r.remove()},t)},e.urlParam=function(e,l){l||(l=window.location.href);try{var t=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(l);return t?t[1]||"":""}catch(a){return""}},e.regexUrl=function(e){e||(e=window.location.href);var l=new Array;return l=e.split("?url="),l[1]?l[1]:(l=e.split("&url="),l[1])},e.localStorageHandler=function(e,l,t){switch(e){case"set":localStorage.setItem(l,t);break;case"get":return localStorage.getItem(l);case"clear":localStorage.removeItem(l);break;case"clearall":localStorage.clear()}},e.setID=function(e){localStorage.setItem("sid",e)},e.getID=function(){return localStorage.getItem("sid")},e.clearID=function(){localStorage.removeItem("sid")},e.parseHandler=function(l,t){switch(l){case"js":return JSON.stringify(t);case"sj":return e.parseJSON(t)}},e.ylbAddCart=function(l,t){var a=e.localStorageHandler("get",l);if(a){for(var n=e.parseHandler("sj",a),r=!1,o=0,c=n.length;c>o;o++)if(n[o].goodsID==t.goodsID){r=!0;break}r?e.ylbAlert("商品已添加购物车"):(t="["+a.substring(1,a.length-1)+","+e.parseHandler("js",t)+"]",e.localStorageHandler("set",l,t),e.ylbAlert("添加成功"))}else e.localStorageHandler("set",l,"["+e.parseHandler("js",t)+"]"),e.ylbAlert("添加成功")},e.ylbRemoveCart=function(l,t){for(var a=e.localStorageHandler("get",l),n=e.parseHandler("sj",a),r="",o=0,c=n.length;c>o;o++)n[o].goodsID!=t&&(r+=e.parseHandler("js",n[o])+",");r="["+r.substring(0,r.length-1)+"]",e.localStorageHandler("set",l,r)},e.checkFlag=function(){e.getID()&&"false"==e.localStorageHandler("get","flag")&&(e.ylbAlert("为了您的账号安全，请设置支付密码"),setTimeout(function(){window.location.href="edit.html?url="+window.location.href},1500))},e.checkIsMobileNumber=function(e){var l=/^1\d{10}$/;return l.test(e)},e.ylbConfirm=function(l){var t={type:"confirm",msg:"",callback:function(){},navCallback:function(){}};e.extend(t,l);var a='<div class="ylb-confirm-cover"></div>',n="";n+="confirm"===t.type?'<input type="button" class="btn-cancel" value="取消"><input type="button" class="btn-yes" value="确认">':'<input type="button" class="btn-yes" value="确认">',a+='<div class="ylb-confirm"><h4 class="confirm-tit">提示</h4><p class="confirm-msg">'+t.msg+'</p><div class="confirm-group">'+n+"</div></div>",e("body").append(a),e(".ylb-confirm-cover").show();var r=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;e(".ylb-confirm").css("margin-top",+r-40+"px"),e("body").delegate(".btn-cancel","click",function(){e(".ylb-confirm-cover").remove(),e(".ylb-confirm").remove(),e("body").undelegate(),t.navCallback()}),e("body").delegate(".btn-yes","click",function(){t.callback(),e(".ylb-confirm-cover").remove(),e(".ylb-confirm").remove(),e("body").undelegate()})}}(jQuery),function(){$(".logout").on("click",function(){e.islogin?($.clearID(),$.localStorageHandler("clear","flag"),window.location.href="login.html"):window.location.href="login.html"}),$(".ylb-search").on("click",function(){$(".ylb-cover").fadeIn(),$(".ylb-search-wrap").fadeIn()}),$(".ylb-menu").on("click",function(){$(".ylb-cover").fadeIn(),$(".ylb-menu-wrap").fadeIn()}),$(".ylb-cover, .ylb-menu-wrap").on("click",function(){$(".ylb-cover").fadeOut(),$(".ylb-search-wrap").fadeOut(),$(".ylb-menu-wrap").fadeOut()});var e={sc:"",islogin:!1},l={init:function(){l.getFList(),$.getID()?(e.islogin=!0,$(".btn-login").hide(),$(".btn-logout").show()):(e.islogin=!1,$(".btn-login").show(),$(".btn-logout").hide())},getFList:function(){$.when($.ajax({url:$.apiUrl+"/goods/kinds",type:"GET"})).done(function(t){$.ylbAjaxHandler(t,function(){e.flist=t.data,t.data.length>0?l.getSList(e.flist[0].code):l.buildVue()})})},getSList:function(t){$.when($.ajax({url:$.apiUrl+"/goods/kinds?code="+t,type:"GET"})).done(function(t){$.ylbAjaxHandler(t,function(){e.slist=t.data,l.buildVue()})})},buildVue:function(){e=new Vue({el:"#ylb-layout",data:e,methods:{search:function(){this.sc?location.href="list.html?n="+this.sc:location.href="list.html"},changeslist:function(e){var t=e.target.attributes["data-id"].value;l.getSList(t)}}})}};l.init()}();