!function(){var t={plist:[],clist:[],alist:[],pc:"",cc:"",ac:"",st:"",et:"",t:0,cp:1,sz:12},e={init:function(){e.getplist(),e.resetDate()},getList:function(){var a="cp="+t.cp+"&sz="+t.sz+"&pc="+t.pc+"&cc="+t.cc+"&ac="+t.ac+"&st="+t.st+"&et="+t.et;$.when($.ajax({url:$.apiUrl+"/statistics/givingscore?"+a,type:"GET"})).done(function(a){$.ylbAjaxHandler(a,function(){t.list=a.data,t.t=a.data.totalCount,e.buildVue()})})},getplist:function(){$.when($.ajax({url:$.apiUrl+"/address",type:"GET"})).done(function(a){$.ylbAjaxHandler(a,function(){t.plist=a.data,e.getList()})})},updatecity:function(e){$.ajax({url:$.apiUrl+"/address?code="+e,type:"GET"}).done(function(e){$.ylbAjaxHandler(e,function(){t.clist=e.data})})},updatearea:function(e){$.ajax({url:$.apiUrl+"/address?code="+e,type:"GET"}).done(function(e){$.ylbAjaxHandler(e,function(){t.alist=e.data})})},resetDate:function(){new Pikaday({field:document.getElementById("std"),firstDay:1,minDate:new Date("2016-07-01"),maxDate:new Date("3020-12-31"),yearRange:[2016,3020]}),new Pikaday({field:document.getElementById("etd"),firstDay:1,minDate:new Date("2016-07-01"),maxDate:new Date("3020-12-31"),yearRange:[2016,3020]})},buildVue:function(){t=new Vue({el:"#order-main",data:t,methods:{setprov:function(a){var n=$(a.target).find("option:selected").val();t.pc=n,t.cc="",t.ac="",t.alist=[],e.updatecity(n)},setcity:function(a){var n=$(a.target).find("option:selected").val();t.cc=n,t.ac="",e.updatearea(n)},setarea:function(e){var a=$(e.target).find("option:selected").val();t.ac=a},filterorder:function(){t.cp=1,e.getList()},prev:function(){t.cp<=1||(t.cp=+t.cp-1,e.getList())},next:function(){t.cp>=Math.ceil(t.t/t.sz)||(t.cp=+t.cp+1,e.getList())},jump:function(){t.cp>=Math.ceil(t.t/t.sz)&&(t.cp=Math.ceil(t.t/t.sz)),t.cp<=1&&(t.cp=1),e.getList()}}}),setTimeout(function(){$.setLeftBar("order")},100)}};e.init()}();