!function(){var n={},i={init:function(){i.buildVue(),$(".op-header").hide()},buildVue:function(){n=new Vue({el:"#login-main",data:n,methods:{login:function(){var i={};i.userName=n.user,i.password=n.pwd,$.ajax({url:$.apiUrl+"/staff/login",type:"POST",data:JSON.stringify(i)}).done(function(n){$.ylbAjaxHandler(n,function(){$.setID(n.data.sessionID),$.setRole(n.data.role),window.location.href="index.html"})})},trylogin:function(i){13==i.keyCode&&n.login()}}})}};i.init()}();