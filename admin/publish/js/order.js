!function(){var t={filter:{},plist:[],clist:[],alist:[],pc:"",cc:"",ac:"",st:"",et:""},e={init:function(){e.getList(),e.resetDate()},getList:function(){$.when($.ajax({url:$.apiUrl+"/statistics/givingscore",type:"GET"})).done(function(a){$.ylbAjaxHandler(a,function(){t.list=a.data,e.getplist()})})},getplist:function(){$.when($.ajax({url:$.apiUrl+"/address",type:"GET"})).done(function(a){$.ylbAjaxHandler(a,function(){t.plist=a.data,e.buildVue()})})},updatecity:function(e){$.ajax({url:$.apiUrl+"/address?code="+e,type:"GET"}).done(function(e){$.ylbAjaxHandler(e,function(){t.clist=e.data})})},updatearea:function(e){$.ajax({url:$.apiUrl+"/address?code="+e,type:"GET"}).done(function(e){$.ylbAjaxHandler(e,function(){t.alist=e.data})})},resetDate:function(){new Pikaday({field:document.getElementById("std"),firstDay:1,minDate:new Date("2016-07-01"),maxDate:new Date("3020-12-31"),yearRange:[2016,3020]}),new Pikaday({field:document.getElementById("etd"),firstDay:1,minDate:new Date("2016-07-01"),maxDate:new Date("3020-12-31"),yearRange:[2016,3020]})},buildVue:function(){t=new Vue({el:"#order-main",data:t,methods:{setprov:function(a){var n=$(a.target).find("option:selected").val();t.pc=n,t.cc="",t.ac="",t.alist=[],e.updatecity(n)},setcity:function(a){var n=$(a.target).find("option:selected").val();t.cc=n,t.ac="",e.updatearea(n)},setarea:function(e){var a=$(e.target).find("option:selected").val();t.ac=a},filterorder:function(){var e="pc="+t.pc+"&cc="+t.cc+"&ac="+t.ac+"&st="+t.st+"&et="+t.et;$.ajax({url:$.apiUrl+"/statistics/givingscore?"+e,type:"GET"}).done(function(e){$.ylbAjaxHandler(e,function(){t.list=e.data})})}}})}};e.init()}();