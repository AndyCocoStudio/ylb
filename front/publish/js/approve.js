!function(){var a={zd:!0,js:!1,tx:!1,zdr:!1,jsr:!1,txr:!1,sz:20,ocp:1,ot:1,aocp:1,aot:1,acp:1,at:1,aacp:1,aat:1,tcp:1,tt:1,atcp:1,att:1,st:"",et:""},t={init:function(){t.getUnorder()},getUnorder:function(){$.when($.ajax({url:$.apiUrl+"/givingscore?k=1&cp="+a.ocp+"&sz="+a.sz,type:"GET"})).done(function(n){$.ylbAjaxHandler(n,function(){a.order=n.data.orders,a.ot=n.data.totalCount,t.getAllorder()})})},pageUnorder:function(){$.when($.ajax({url:$.apiUrl+"/givingscore?k=1&cp="+a.ocp+"&sz="+a.sz,type:"GET"})).done(function(t){$.ylbAjaxHandler(t,function(){a.order=t.data.orders,a.ot=t.data.totalCount})})},getAllorder:function(){$.when($.ajax({url:$.apiUrl+"/givingscore?k=0&cp="+a.aocp+"&sz="+a.sz,type:"GET"})).done(function(n){$.ylbAjaxHandler(n,function(){a.aorder=n.data.orders,a.aot=n.data.totalCount,t.getUnapply()})})},pageAllorder:function(){$.when($.ajax({url:$.apiUrl+"/givingscore?k=0&cp="+a.aocp+"&sz="+a.sz,type:"GET"})).done(function(t){$.ylbAjaxHandler(t,function(){a.aorder=t.data.orders,a.aot=t.data.totalCount})})},getUnapply:function(){$.when($.ajax({url:$.apiUrl+"/applies?k=1&cp="+a.acp+"&sz="+a.sz,type:"GET"})).done(function(n){$.ylbAjaxHandler(n,function(){a.apply=n.data.applies,a.at=n.data.totalCount,t.getAllapply()})})},pageUnapply:function(){$.when($.ajax({url:$.apiUrl+"/applies?k=1&cp="+a.acp+"&sz="+a.sz,type:"GET"})).done(function(t){$.ylbAjaxHandler(t,function(){a.apply=t.data.applies,a.at=t.data.totalCount})})},getAllapply:function(){$.when($.ajax({url:$.apiUrl+"/applies?k=0&cp="+a.aacp+"&sz="+a.sz,type:"GET"})).done(function(n){$.ylbAjaxHandler(n,function(){a.aapply=n.data.applies,a.aat=n.data.totalCount,t.getUntransfer()})})},pageAllapply:function(){$.when($.ajax({url:$.apiUrl+"/applies?k=0&cp="+a.aacp+"&sz="+a.sz,type:"GET"})).done(function(t){$.ylbAjaxHandler(t,function(){a.aapply=t.data.applies,a.aat=t.data.totalCount})})},getUntransfer:function(){$.when($.ajax({url:$.apiUrl+"/area/transfers?k=0&cp="+a.tcp+"&sz="+a.sz,type:"GET"})).done(function(n){$.ylbAjaxHandler(n,function(){a.transfer=n.data.transfers,a.tt=n.data.totalCount,t.getAlltransfer()})})},pageUntransfer:function(){$.when($.ajax({url:$.apiUrl+"/area/transfers?k=0&cp="+a.tcp+"&sz="+a.sz,type:"GET"})).done(function(t){$.ylbAjaxHandler(t,function(){a.transfer=t.data.transfers,a.tt=t.data.totalCount})})},getAlltransfer:function(){$.when($.ajax({url:$.apiUrl+"/area/transfers?k=1&cp="+a.atcp+"&sz="+a.sz,type:"GET"})).done(function(n){$.ylbAjaxHandler(n,function(){a.atransfer=n.data.transfers,a.att=n.data.totalCount,t.buildVue()})})},pageAlltransfer:function(){$.when($.ajax({url:$.apiUrl+"/area/transfers?k=1&cp="+a.atcp+"&sz="+a.sz,type:"GET"})).done(function(t){$.ylbAjaxHandler(t,function(){a.atransfer=t.data.transfers,a.att=t.data.totalCount})})},buildVue:function(){a=new Vue({el:"#approve-main",data:a,methods:{changetip:function(a){switch(a){case 1:this.zd=!0,this.js=!1,this.tx=!1,this.zdr=!1,this.jsr=!1,this.txr=!1;break;case 2:this.zd=!1,this.js=!0,this.tx=!1,this.zdr=!1,this.jsr=!1,this.txr=!1;break;case 3:this.zd=!1,this.js=!1,this.tx=!0,this.zdr=!1,this.jsr=!1,this.txr=!1;break;case 4:this.zd=!1,this.js=!1,this.tx=!1,this.zdr=!0,this.jsr=!1,this.txr=!1;break;case 5:this.zd=!1,this.js=!1,this.tx=!1,this.zdr=!1,this.jsr=!0,this.txr=!1;break;case 6:this.zd=!1,this.js=!1,this.tx=!1,this.zdr=!1,this.jsr=!1,this.txr=!0;break;default:this.zd=!0,this.js=!1,this.tx=!1,this.zdr=!1,this.jsr=!1,this.txr=!1}},agreetrs:function(a){var n=confirm("确认同意该转出申请？");n&&$.ajax({url:$.apiUrl+"/transfer/agree",type:"POST",data:JSON.stringify({transferID:a})}).done(function(a){$.ylbAjaxHandler(a,function(){$.ylbAlert("操作成功"),t.getUntransfer()})})},rejecttrs:function(a){var n=confirm("确认决绝该转出申请？");n&&$.ajax({url:$.apiUrl+"/transfer/reject",type:"POST",data:JSON.stringify({transferID:a})}).done(function(a){$.ylbAjaxHandler(a,function(){$.ylbAlert("操作成功"),t.getUntransfer()})})},oprev:function(){a.ocp<=1||(a.ocp=+a.ocp-1,t.pageUnorder())},onext:function(){a.ocp>=Math.ceil(a.ot/a.sz)||(a.ocp=+a.ocp+1,t.pageUnorder())},ojump:function(){a.ocp>=Math.ceil(a.ot/a.sz)&&(a.ocp=Math.ceil(a.ot/a.sz)),a.ocp<=1&&(a.ocp=1),t.pageUnorder()},aoprev:function(){a.aocp<=1||(a.aocp=+a.aocp-1,t.pageAllorder())},aonext:function(){a.aocp>=Math.ceil(a.aot/a.sz)||(a.aocp=+a.aocp+1,t.pageAllorder())},aojump:function(){a.aocp>=Math.ceil(a.aot/a.sz)&&(a.aocp=Math.ceil(a.aot/a.sz)),a.aocp<=1&&(a.aocp=1),t.pageAllorder()},aprev:function(){a.acp<=1||(a.acp=+a.acp-1,t.pageUnapply())},anext:function(){a.acp>=Math.ceil(a.at/a.sz)||(a.acp=+a.acp+1,t.pageUnapply())},ajump:function(){a.acp>=Math.ceil(a.at/a.sz)&&(a.acp=Math.ceil(a.at/a.sz)),a.acp<=1&&(a.acp=1),t.pageUnapply()},aaprev:function(){a.aacp<=1||(a.aacp=+a.aacp-1,t.pageAllapply())},aanext:function(){a.aacp>=Math.ceil(a.aat/a.sz)||(a.aacp=+a.aacp+1,t.pageAllapply())},aajump:function(){a.aacp>=Math.ceil(a.aat/a.sz)&&(a.aacp=Math.ceil(a.aat/a.sz)),a.aacp<=1&&(a.aacp=1),t.pageAllapply()},tprev:function(){a.tcp<=1||(a.tcp=+a.tcp-1,t.pageUntransfer())},tnext:function(){a.tcp>=Math.ceil(a.tt/a.sz)||(a.tcp=+a.tcp+1,t.pageUntransfer())},tjump:function(){a.tcp>=Math.ceil(a.tt/a.sz)&&(a.tcp=Math.ceil(a.tt/a.sz)),a.tcp<=1&&(a.tcp=1),t.pageUntransfer()},atprev:function(){a.atcp<=1||(a.atcp=+a.atcp-1,t.pageUntransfer())},atnext:function(){a.atcp>=Math.ceil(a.att/a.sz)||(a.atcp=+a.atcp+1,t.pageUntransfer())},atjump:function(){a.atcp>=Math.ceil(a.att/a.sz)&&(a.atcp=Math.ceil(a.att/a.sz)),a.atcp<=1&&(a.atcp=1),t.pageUntransfer()}}})}};t.init()}();