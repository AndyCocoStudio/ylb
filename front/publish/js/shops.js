!function(){var t={plist:[],clist:[],alist:[]},a={init:function(){a.getShops(),a.getplist()},getplist:function(){$.when($.ajax({url:$.apiUrl+"/address",type:"GET"})).done(function(a){t.plist=a.data})},getShops:function(n){var e="";e=n?"/merchants?ac="+n:"/merchants",$.when($.ajax({url:$.apiUrl+e,type:"GET"})).done(function(n){$.ylbAjaxHandler(n,function(){t.list=n.data.merchants,a.buildVue()})})},updateclist:function(a){$.ajax({url:$.apiUrl+"/address?code="+a,type:"GET"}).done(function(a){$.ylbAjaxHandler(a,function(){t.clist=a.data})})},updatealist:function(a){$.ajax({url:$.apiUrl+"/address?code="+a,type:"GET"}).done(function(a){$.ylbAjaxHandler(a,function(){t.alist=a.data})})},buildVue:function(){t=new Vue({el:"#shops-main",data:t,methods:{selprov:function(n){var e=$(n.target).find("option:selected").val();t.alist=[],a.updateclist(e),t.ac=""},selcity:function(n){var e=$(n.target).find("option:selected").val();t.alist=[],a.updatealist(e),t.ac=""},selarea:function(a){var n=$(a.target).find("option:selected").val();t.ac=n},searchshops:function(){a.getShops(t.ac)},showall:function(){a.getShops()}}})}};a.init()}();