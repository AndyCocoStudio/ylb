!function(){var i={id:$.urlParam("oid")},n={init:function(){n.getOrder()},getOrder:function(){$.when($.ajax({url:$.apiUrl+"/bill?oid="+i.id,type:"GET"})).done(function(e){$.ylbAjaxHandler(e,function(){i.order=e.data,n.buildVue()})})},buildVue:function(){i=new Vue({el:"#pay-main",data:i,methods:{}})}};n.init()}();