!function(){var e={hideaddress:!1,id:$.urlParam("id")||"",count:$.urlParam("count")||1,total:0,postage:0,ispoint:"disabled",maxpoint:0,point:0,product:{},address:{},select:{},showlist:!1,plist:[],clist:[],alist:[],newaddress:{name:"",mobile:"",province:"",provinceCode:"",city:"",cityCode:"",area:"",areaCode:"",street:"",postCode:"",isDefault:1}},t={init:function(){t.getAddress(),t.getPlist()},getPlist:function(){$.when($.ajax({url:$.apiUrl+"/address",type:"GET"})).done(function(t){$.ylbAjaxHandler(t,function(){e.plist=t.data})})},getClist:function(t){$.when($.ajax({url:$.apiUrl+"/address?code="+t,type:"GET"})).done(function(t){$.ylbAjaxHandler(t,function(){e.clist=t.data})})},getAlist:function(t){$.when($.ajax({url:$.apiUrl+"/address?code="+t,type:"GET"})).done(function(t){$.ylbAjaxHandler(t,function(){e.alist=t.data})})},getAddress:function(){$.when($.ajax({url:$.apiUrl+"/user/addresses",type:"GET"})).done(function(d){$.ylbAjaxHandler(d,function(){e.address=d.data,e.defaultaddress=d.data[0],t.getProduct()})})},updateAddress:function(){$.ajax({url:$.apiUrl+"/user/addresses",type:"GET"}).done(function(t){$.ylbAjaxHandler(t,function(){e.address=t.data,e.defaultaddress=t.data[0],e.hideaddress=!1})})},getProduct:function(){if(e.id)$.when($.ajax({url:$.apiUrl+"/goods/detail",type:"GET",data:{id:e.id}})).done(function(d){$.ylbAjaxHandler(d,function(){e.product=d.data,e.product.goodses[0].count=e.count,t.countPrice(),t.buildVue()})});else{var d=$.parseHandler("sj",$.localStorageHandler("get","shopcart"));e.product.goodses=d,t.countPrice(),t.buildVue()}},countPrice:function(){for(var t=0,d=0,a=0;a<e.product.goodses.length;a++){var n=e.product.goodses[a];t+=n.price*n.count,d+=n.deduction*n.count}e.total=t.toFixed(2),e.maxpoint=d},buildVue:function(){e=new Vue({el:"#order-main",data:e,methods:{choseaddress:function(t){e.select.addressID=t.target.attributes["data-id"].value},showaddress:function(){e.hideaddress=!e.hideaddress},alladdress:function(){e.showlist=!e.showlist},changeprov:function(d){var a=$(d.target),n=a.val(),o=a.find("option:selected").text();e.newaddress.provinceCode=n,e.newaddress.province=o,e.alist=[],t.getClist(n)},changecity:function(d){var a=$(d.target),n=a.val(),o=a.find("option:selected").text();e.newaddress.cityCode=n,e.newaddress.city=o,t.getAlist(n)},changearea:function(t){var d=$(t.target),a=d.val(),n=d.find("option:selected").text();e.newaddress.areaCode=a,e.newaddress.area=n},addcount:function(d){var a=$(d.target).attr("data-index");e.product.goodses[a].count=+e.product.goodses[a].count,e.product.goodses[a].count+=1,t.countPrice()},reducecount:function(d){var a=$(d.target).attr("data-index");e.product.goodses[a].count=+e.product.goodses[a].count,e.product.goodses[a].count-1>0&&(e.product.goodses[a].count-=1),t.countPrice()},canuse:function(){"disabled"==e.ispoint?e.ispoint=!1:e.ispoint="disabled"},usepoint:function(){e.point>e.maxpoint&&(e.point=e.maxpoint)},addaddress:function(){$.ajax({url:$.apiUrl+"/user/address",type:"PUT",data:JSON.stringify(e.newaddress)}).done(function(e){$.ylbAjaxHandler(e,function(){$.ylbAlert("添加成功！"),t.updateAddress()})})},deleteadr:function(e){var d=confirm("确认要删除该地址?");if(d){var a=e.target.attributes["data-id"].value;$.ajax({url:$.apiUrl+"/user/address?id="+a,type:"DELETE"}).done(function(e){$.ylbAjaxHandler(e,function(){$.ylbAlert("删除成功！"),t.updateAddress()})})}},neworder:function(){if(!e.select.addressID)return void $.ylbAlert("请选择收货地址");for(var t={},d="",a=[],n=0;n<e.product.goodses.length;n++){var o=e.product.goodses[n],s={goodsID:o.goodsID,quantity:o.count,note:o.remark};a.push(s)}t.items=a,t.score=e.point,t.addressID=e.select.addressID,$.ajax({url:$.apiUrl+"/order/shoppingonline",type:"PUT",data:JSON.stringify(t)}).done(function(t){$.ylbAjaxHandler(t,function(){d=t.data,e.id||$.localStorageHandler("clear","shopcart")})})}}})}};t.init()}();