!function(){var t={cp:1,sz:20,t:0},a={init:function(){a.getAreaList()},getAreaList:function(){$.when($.ajax({url:$.apiUrl+"/user/all?cp="+t.cp+"&sz="+t.sz+"&k=0",type:"GET"})).done(function(e){$.ylbAjaxHandler(e,function(){t.list=e.data.areaManagers,t.t=e.data.totalCount,a.buildVue()})})},buildVue:function(){t=new Vue({el:"#toarea-main",data:t,methods:{sends:function(t){var e=$(t.target),n=e.attr("data-id"),i=e.prev("input").val();return i&&"0"!=i?void $.ajax({url:$.apiUrl+"/areamanager/quota",type:"PuT",data:JSON.stringify({receiverID:n,quota:i})}).done(function(t){$.ylbAjaxHandler(t,function(){$.ylbAlert("赠送成功！"),a.getAreaList()})}):void $.ylbAlert("请填写赠送数额")},prev:function(){t.cp<=1||(t.cp=+t.cp-1,a.getAreaList())},next:function(){t.cp>=Math.ceil(t.t/t.sz)||(t.cp=+t.cp+1,a.getAreaList())},jump:function(){t.cp>=Math.ceil(t.t/t.sz)&&(t.cp=Math.ceil(t.t/t.sz)),t.cp<=1&&(t.cp=1),a.getAreaList()}}})}};a.init()}();