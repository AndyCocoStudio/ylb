!function(){var o={hideaddress:!1,id:$.urlParam("id")||"",count:$.urlParam("count")||"",total:0,postage:0,ispoint:"disabled",maxpoint:0,point:0,product:{},address:{},select:{},note:"无",plist:[],clist:[],alist:[],selectprov:"",selectcity:"",selectarea:"",newaddress:{name:"收货人姓名",mobile:"手机号",province:"省份",provinceCode:"",city:"城市",cityCode:"330100",area:"区域",areaCode:"330104",street:"街道地址",isDefault:1},selectaddress:{name:"收货人姓名",mobile:"手机号",province:"省份",provinceCode:"",city:"城市",cityCode:"330100",area:"区域",areaCode:"330104",street:"街道地址",isDefault:1}},t={init:function(){t.getAddress()},getAddress:function(){$.when($.ajax({url:$.apiUrl+"/user/addresses",type:"GET"})).done(function(e){$.ylbAjaxHandler(e,function(){o.address=e.data,t.getProduct()})})},getProduct:function(){o.id&&$.when($.ajax({url:$.apiUrl+"/goods/detail",type:"GET",data:{id:o.id}})).done(function(e){$.ylbAjaxHandler(e,function(){o.product=e.data,o.product.goodses[0].count=o.count,t.countPrice(),t.buildVue()})})},countPrice:function(){for(var t=0,e=0,n=0;n<o.product.goodses.length;n++){var d=o.product.goodses[n];t+=d.price*d.count,e+=d.deduction*d.count}o.total=t.toFixed(2),o.maxpoint=e},buildVue:function(){o=new Vue({el:"#order-main",data:o,methods:{showaddress:function(){o.hideaddress=!o.hideaddress},addcount:function(e){var n=$(e.target).attr("data-index");o.product.goodses[n].count=+o.product.goodses[n].count,o.product.goodses[n].count+=1,t.countPrice()},reducecount:function(e){var n=$(e.target).attr("data-index");o.product.goodses[n].count=+o.product.goodses[n].count,o.product.goodses[n].count-1>0&&(o.product.goodses[n].count-=1),t.countPrice()},canuse:function(){"disabled"==o.ispoint?o.ispoint=!1:o.ispoint="disabled"},usepoint:function(){o.point>o.maxpoint&&(o.point=o.maxpoint)},newaddress:function(){},neworder:function(){for(var t={},e="",n="",d=0;d<o.product.goodses.length;d++){var i=o.product.goodses[d];n+="{goodsID:"+i.goodsID+",quantity:"+i.count+",note:"+o.note+"},"}n="["+n.substring(0,n.length-1)+"]",t.items=n,t.score=o.point,t.addressID="123",$.ajax({url:$.apiUrl+"/order/shoppingonline",type:"PUT",data:JSON.stringify(t)}).done(function(o){$.ylbAjaxHandler(o,function(){e=o.data,window.location.href="pay.html?oid="+e})})}}})}};t.init()}();