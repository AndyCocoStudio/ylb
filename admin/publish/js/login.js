!function(){var n={},e={init:function(){e.buildVue(),$(".op-header").hide()},buildVue:function(){n=new Vue({el:"#login-main",data:n,methods:{login:function(){var e={};e.userName=n.user,e.password=n.pwd,$.ajax({url:$.apiUrl+"/staff/login",type:"POST",data:JSON.stringify(e)}).done(function(n){$.ylbAjaxHandler(n,function(){switch($.setID(n.data.sessionID),n.data.role){case"Admin":window.location.href="superadmin.html";break;case"Marketing":window.location.href="product.html";break;case"FinancialAffairs":window.location.href="transfers.html";break;case"CustomerService":window.location.href="onlineorder.html";break;case"GeneralManager":window.location.href="upgraderight.html"}})})},trylogin:function(e){13==e.keyCode&&n.login()}}})}};e.init()}();