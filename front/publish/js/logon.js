!function(){var e={mobile:"",password:"",ref:$.urlParam("rid"),url:$.regexUrl()||"",num:60,counting:!1,countdown:0},n={init:function(){n.buildVue()},buildVue:function(){e=new Vue({el:"#logon-main",data:e,methods:{logon:function(){if(e.mobile)if(e.mobile.length<11)$.ylbAlert("手机号码位数不正确");else if($.checkIsMobileNumber(e.mobile)){if(!e.password)return void $.ylbAlert("请输入密码");$.ajax({url:$.apiUrl+"/user/register",type:"PUT",data:JSON.stringify({mobile:e.mobile,password:e.password,referrerMobile:e.ref})}).done(function(e){$.ylbAjaxHandler(e,function(){$.setID(e.data.sessionID),$.localStorageHandler("set","flag",e.data.flag),window.location.href="index.html"})})}else $.ylbAlert("请输入正确手机号");else $.ylbAlert("请输入手机号码")},tologon:function(n){13==n.keyCode&&e.logon()},getCode:function(){e.counting||(e.mobile?e.mobile.length<11?$.ylbAlert("手机号码位数不正确"):$.checkIsMobileNumber(e.mobile)?(e.counting=!0,$.ajax({url:$.apiUrl+"/captcha",type:"PUT",data:JSON.stringify({mobile:e.mobile})}).done(function(o){$.ylbAjaxHandler(o,function(){$.ylbAlert("发送成功"),e.countdown=setInterval(n.countDown,1e3)})})):$.ylbAlert("请输入正确手机号"):$.ylbAlert("请输入手机号码"))}}})},countDown:function(){e.num>1?(e.num-=1,$(".btn-code").val(e.num+"秒后重新获取")):(e.counting=!1,$(".btn-code").val("重新获取"),e.num=60,clearInterval(e.countdown))}};n.init()}();