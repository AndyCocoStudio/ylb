!function(){var n={},a={init:function(){a.getUserInfo()},getUserInfo:function(){$.when($.ajax({url:$.apiUrl+"/user/abstract",type:"GET"})).done(function(e){$.ylbAjaxHandler(e,function(){n.user=e.data,"AreaManager"==e.data.role||"AM"==e.data.role?a.getAMerchant():a.getCMerchant()})})},getAMerchant:function(){$.when($.ajax({url:$.apiUrl+"/area/merchants?cp=1&sz=1000",type:"GET"})).done(function(e){$.ylbAjaxHandler(e,function(){n.ml=e.data.merchants,a.getCustomer()})})},getCMerchant:function(){$.when($.ajax({url:$.apiUrl+"/customermanager/merchants?cp=1&sz=1000",type:"GET"})).done(function(e){$.ylbAjaxHandler(e,function(){n.ml=e.data.merchants,a.buildVue()})})},getCustomer:function(){$.when($.ajax({url:$.apiUrl+"/area/customermanager?cp=1&sz=1000",type:"GET"})).done(function(e){$.ylbAjaxHandler(e,function(){n.cm=e.data.customerManagers,a.buildVue()})})},buildVue:function(){n=new Vue({el:"#record-main",data:n,methods:{}})}};a.init()}();