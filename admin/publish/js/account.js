!function(){var t={edita:!1,cover:!1,newa:!1,na:{name:"",password:"",role:""},ea:{}},a={init:function(){a.getRoleList()},getRoleList:function(){$.when($.ajax({url:$.apiUrl+"/staff",type:"GET"})).done(function(e){$.ylbAjaxHandler(e,function(){t.list=e.data.staff,a.buildVue()})})},buildVue:function(){t=new Vue({el:"#account-main",data:t,methods:{editaccount:function(a){t.edita=!0,t.cover=!0,t.ea=t.list[a]},hideall:function(){t.edita=!1,t.cover=!1,t.newa=!1},newaccount:function(){t.newa=!0,t.cover=!0},nselrole:function(a){var e=$(a.target).find("option:selected").val();t.na.role=e},eselrole:function(a){var e=$(a.target).find("option:selected").val();t.ea.role=e},createaccount:function(){$.ajax({url:$.apiUrl+"/staff",type:"PUT",data:JSON.stringify(t.na)}).done(function(e){$.ylbAjaxHandler(e,function(){$.ylbAlert("添加成功！"),t.hideall(),t.na={name:"",password:"",role:""},a.getRoleList()})})},updateaccount:function(){$.ajax({url:$.apiUrl+"/staff/password",type:"POST",data:JSON.stringify({staffID:t.ea.staffID,password:t.ea.password})}).done(function(e){$.ylbAjaxHandler(e,function(){$.ylbAlert("修改成功！"),t.hideall(),a.getRoleList()})})},delaccount:function(e){var n=confirm("是否要删除该用户？");n&&$.ajax({url:$.apiUrl+"/staff?id="+e,type:"DELETE"}).done(function(e){$.ylbAjaxHandler(e,function(){$.ylbAlert("删除成功！"),t.hideall(),a.getRoleList()})})}}}),setTimeout(function(){$.setLeftBar("account")},100)}};a.init()}();