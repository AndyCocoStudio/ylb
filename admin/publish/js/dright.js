!function(){var a={amshow:!1,cmshow:!1,mshow:!1,af:{mobile:"",name:""},cf:{mobile:"",name:""},mf:{mobile:"",name:""}},e={init:function(){e.getArea()},getArea:function(n,t){var i="";i=n||t?$.apiUrl+"/user/all?cp=1&sz=1000&k=0&mobile="+n+"&name="+t:$.apiUrl+"/user/all?cp=1&sz=1000&k=0",$.when($.ajax({url:i,type:"GET"})).done(function(n){$.ylbAjaxHandler(n,function(){a.amlist=n.data.areaManagers,e.getCustomer()})})},getCustomer:function(n,t){var i="";i=n||t?$.apiUrl+"/user/all?cp=1&sz=1000&k=1&mobile="+n+"&name="+t:$.apiUrl+"/user/all?cp=1&sz=1000&k=1",$.when($.ajax({url:i,type:"GET"})).done(function(n){$.ylbAjaxHandler(n,function(){a.cmlist=n.data.customerManagers,e.getMerchant()})})},getMerchant:function(n,t){var i="";i=n||t?$.apiUrl+"/user/all?cp=1&sz=1000&k=2&mobile="+n+"&name="+t:$.apiUrl+"/user/all?cp=1&sz=1000&k=2",$.when($.ajax({url:i,type:"GET"})).done(function(n){$.ylbAjaxHandler(n,function(){a.mlist=n.data.merchants,e.buildVue()})})},buildVue:function(){a=new Vue({el:"#right-main",data:a,methods:{toggleaml:function(){this.amshow=!this.amshow},togglecml:function(){this.cmshow=!this.cmshow},toggleml:function(){this.mshow=!this.mshow},fam:function(){e.getArea(a.af.mobile,a.af.name)},fcm:function(){e.getCustomer(a.cf.mobile,a.cf.name)},fm:function(){e.getMerchant(a.mf.mobile,a.mf.name)},todr:function(a){var n=confirm("确认要对该用户进行降权？");n&&$.ajax({url:$.apiUrl+"/user/dismissal",type:"POST",data:JSON.stringify({userID:a})}).done(function(a){$.ylbAjaxHandler(a,function(){$.ylbAlert("操作成功！"),e.getArea()})})}}})}};e.init()}();