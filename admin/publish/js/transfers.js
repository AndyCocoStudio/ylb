!function(){var t={unt:!0,fnt:!1,sz:20,ucp:1,ut:1,fcp:1,ft:1,cover:!1,greason:!1,reason:"",tid:""},n={init:function(){n.getData()},getData:function(){$.ajax({url:$.apiUrl+"/transfers?k=0&cp="+t.ucp+"&sz="+t.sz,type:"GET"}).done(function(a){$.ylbAjaxHandler(a,function(){t.ulist=a.data.transfers,t.ut=a.data.totalCount,n.getAll()})})},getAll:function(){$.ajax({url:$.apiUrl+"/transfers?k=1&cp="+t.fcp+"&sz="+t.sz,type:"GET"}).done(function(a){$.ylbAjaxHandler(a,function(){t.flist=a.data.transfers,t.ft=a.data.totalCount,n.buildVue()})})},buildVue:function(){t=new Vue({el:"#transfer-main",data:t,methods:{agree:function(t){var a=confirm("确认已放款？");a&&$.ajax({url:$.apiUrl+"/transfer/paid",type:"POST",data:JSON.stringify({transferID:t})}).done(function(t){$.ylbAjaxHandler(t,function(){$.ylbAlert("操作成功"),n.getData()})})},disagree:function(){$.ajax({url:$.apiUrl+"/transfer/op/reject",type:"POST",data:JSON.stringify({transferID:t.tid,reason:t.reason})}).done(function(t){$.ylbAjaxHandler(t,function(){$.ylbAlert("操作成功"),n.getData()})})},showreason:function(t){this.tid=t,this.cover=!0,this.greason=!0},hideall:function(){this.cover=!1,this.greason=!1},togglet:function(n){switch(n){case 1:t.unt=!0,t.fnt=!1;break;case 2:t.unt=!1,t.fnt=!0;break;default:t.unt=!0,t.fnt=!1}},uprev:function(){t.ucp<=1||(t.ucp=+t.ucp-1,n.getData())},unext:function(){t.ucp>=Math.ceil(t.ut/t.sz)||(t.ucp=+t.ucp+1,n.getData())},ujump:function(){t.ucp>=Math.ceil(t.ut/t.sz)&&(t.ucp=Math.ceil(t.ut/t.sz)),t.ucp<=1&&(t.ucp=1),n.getData()},fprev:function(){t.fcp<=1||(t.fcp=+t.fcp-1,n.getData())},fnext:function(){t.fcp>=Math.ceil(t.ft/t.sz)||(t.fcp=+t.fcp+1,n.getData())},fjump:function(){t.fcp>=Math.ceil(t.ft/t.sz)&&(t.fcp=Math.ceil(t.ft/t.sz)),t.fcp<=1&&(t.fcp=1),n.getData()}}}),setTimeout(function(){$.setLeftBar("transfers")},100)}};n.init()}();