!function(){var t={isedit:!1},n={init:function(){n.getConfig()},getConfig:function(){$.when($.ajax({url:$.apiUrl+"/configs",type:"GET"})).done(function(i){$.ylbAjaxHandler(i,function(){t.option=i.data,n.buildVue()})})},buildVue:function(){t=new Vue({el:"#config-main",data:t,methods:{edit:function(t){var i=$(t.target),a=i.attr("data-key"),e=i.attr("data-value"),o=confirm("确定要设置该项？");o&&$.ajax({url:$.apiUrl+"/config",type:"POST",data:JSON.stringify({key:a,value:e})}).done(function(t){$.ylbAlert("设置成功！"),n.getConfig()})}}}),setTimeout(function(){$.setLeftBar("config")},100)}};n.init()}();