!function(){var n={uid:$.urlParam("uid")||"",name:"",type:"",points:0,poundage:0,asset:{},free:!1},i={init:function(){i.getAsset(),n.uid||(n.free=!0),$.checkFlag()},getAsset:function(){$.when($.ajax({url:$.apiUrl+"/user/asset",type:"GET"})).done(function(e){$.ylbAjaxHandler(e,function(){n.asset=e.data,i.getconfig()})})},getconfig:function(){$.when($.ajax({url:$.apiUrl+"/config",type:"GET"})).done(function(e){$.ylbAjaxHandler(e,function(){n.config=e.data,i.buildVue()})})},buildVue:function(){n=new Vue({el:"#sendpoint-main",data:n,methods:{createOrder:function(){$.ajax({url:$.apiUrl+"/order/givingscore",type:"PUT",data:JSON.stringify({goodsName:n.name,goodsKind:n.type,userMobile:n.uid,score:n.points,deduction:n.poundage})}).done(function(n){console.log(n),$.ylbAjaxHandler(n,function(){window.location.href="pay.html?oid="+n.data})})},inuse:function(){alert(this.config.gsd),this.poundage>this.points*this.config.pr*this.config.gsd/1e4&&(this.poundage=(this.points*this.config.pr*this.config.gsd/1e4).toFixed(2))}}})}};i.init()}();