!function(){var a={sid:$.getID(),avatar:!1,address:!1,password:!0,detail:!1},t={init:function(){$.checkSession(),t.getUserInfo()},createQRcode:function(){var t="http://www.hnylbsc.com/sendpoint.html?uid="+a.info.mobile;$("#customer-private-qrcode").qrcode({render:"table",width:130,height:130,text:t})},getUserInfo:function(){$.when($.ajax({url:$.apiUrl+"/user/abstract",type:"GET"})).done(function(s){$.ylbAjaxHandler(s,function(){a.info=s.data,t.buildVue()})})},buildVue:function(){a=new Vue({el:"#customer-main",data:a,methods:{changetap:function(a){var t=$(a.target),s=t.attr("data-role");switch(s){case"avatar":this.avatar=!0,this.address=!1,this.password=!1,this.detail=!1;break;case"address":this.avatar=!1,this.address=!0,this.password=!1,this.detail=!1;break;case"password":this.avatar=!1,this.address=!1,this.password=!0,this.detail=!1;break;case"detail":this.avatar=!1,this.address=!1,this.password=!1,this.detail=!0;break;default:this.avatar=!1,this.address=!1,this.password=!0,this.detail=!1}}}}),t.createQRcode()}};t.init()}();