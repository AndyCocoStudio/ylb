!function(){var e={order:{merchantMobile:$.urlParam("mid")||"",score:""},merchant:{name:"",address:""},useb:0,hasnum:!!$.urlParam("mid")},n={init:function(){n.getInfo()},getInfo:function(){$.when($.ajax({url:$.apiUrl+"/user/abstract",type:"GET"})).done(function(a){$.ylbAjaxHandler(a,function(){e.info=a.data,n.buildVue()})})},buildVue:function(){e=new Vue({el:"#spendpoint-main",data:e,methods:{createOrder:function(){return e.order.merchantMobile?e.order.score?void $.ajax({url:$.apiUrl+"/order/shoppingoffline",type:"PUT",data:JSON.stringify({merchantMobile:e.order.merchantMobile,amount:e.order.score})}).done(function(e){$.ylbAjaxHandler(e,function(){window.location.href="pay.html?oid="+e.data})}):void alert("请填入兑换积分数"):void alert("请填入商家手机号")},usebalance:function(n){$(n.target).is(":checked")?e.useb=1:e.useb=0},getstoreinfo:function(){e.merchant.name="",$.when($.ajax({url:$.apiUrl+"/merchant?m="+e.order.merchantMobile,type:"GET"})).done(function(n){$.ylbAjaxHandler(n,function(){e.merchant.name=n.data.storeName})})}}}),e.hasnum&&e.getstoreinfo()}};n.init()}();