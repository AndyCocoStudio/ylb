!function(){var t={pc:"",cc:"",ac:"",plist:[],clist:[],alist:[]},a={init:function(){a.getUserList(),a.getplist()},getplist:function(){$.when($.ajax({url:$.apiUrl+"/address",type:"GET"})).done(function(a){$.ylbAjaxHandler(a,function(){t.plist=a.data})})},filterusers:function(){$.when($.ajax({url:$.apiUrl+"/statistics/marketing?cityCode="+t.cc+"&areaCode="+t.ac,type:"GET"})).done(function(a){$.ylbAjaxHandler(a,function(){t.info=a.data})})},updatecity:function(a){$.ajax({url:$.apiUrl+"/address?code="+a,type:"GET"}).done(function(a){$.ylbAjaxHandler(a,function(){t.clist=a.data})})},updatearea:function(a){$.ajax({url:$.apiUrl+"/address?code="+a,type:"GET"}).done(function(a){$.ylbAjaxHandler(a,function(){t.alist=a.data})})},getUserList:function(){$.when($.ajax({url:$.apiUrl+"/statistics/marketing",type:"GET"})).done(function(n){$.ylbAjaxHandler(n,function(){t.info=n.data,a.buildVue()})})},buildVue:function(){t=new Vue({el:"#users-main",data:t,methods:{changeprov:function(n){var e=$(n.target).find("option:selected").val();t.pc=e,t.cc="",t.ac="",t.alist=[],a.updatecity(e)},changecity:function(n){var e=$(n.target).find("option:selected").val();t.cc=e,t.ac="",a.updatearea(e)},changearea:function(a){var n=$(a.target).find("option:selected").val();t.ac=n},filteruser:function(){a.filterusers()}}})}};a.init()}();