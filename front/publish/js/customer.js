!function(){var e={pcode:"",rcode:"",covershow:!1,sendshow:!1,spendshow:!1,applyrole:-1,isapplyunder:!1,isapplymanager:!1,nagtive:!1,ordernagtive:!1,sid:$.getID(),counting:!1,countdown:0,num:60,appID:"",order:[],jfdh:!0,xsxf:!1,sjzd:!1,reason:"",orderreason:"",role:"-1",plist:[],clist:[],alist:[],zdsh:!0,jssh:!1,fzdsh:!1,fjssh:!1,zczc:!1,zzsjzd:!1,spendpoint:{name:"",type:"",count:"",total:"",point:"",mobile:""},reward:{way:1,amount:0,account:"",bank:""},total:{},tj:{mobile:"",captcha:"",referrerMobile:""},tobesaler:{referrerMobile:"",idCard:"",storeName:"",province:"",provinceCode:"",city:"",cityCode:"",area:"",areaCode:"",street:"",legalPerson:"",legalPersonIDCardImage:[],legalPersonWithIDCardInHandImage:"",storeAppearance:"",storeInsideImages:[],license:""},tobearea:{street:"",applicantName:"",province:"",provinceCode:"",city:"",cityCode:"",area:"",areaCode:"",idCard:"",legalPersonIDCardImage:[],legalPersonWithIDCardInHandImage:""}},a={init:function(){$.checkSession(),$.checkFlag(),a.getUserInfo(),a.getProvince()},getProvince:function(){$.when($.ajax({url:$.apiUrl+"/address",type:"GET"})).done(function(a){$.ylbAjaxHandler(a,function(){e.plist=a.data})})},getCity:function(a){$.when($.ajax({url:$.apiUrl+"/address?code="+a,type:"GET"})).done(function(a){$.ylbAjaxHandler(a,function(){e.clist=a.data})})},getArea:function(a){$.when($.ajax({url:$.apiUrl+"/address?code="+a,type:"GET"})).done(function(a){$.ylbAjaxHandler(a,function(){e.alist=a.data})})},imgUpload:function(){$("#yyzz").dropzone({init:function(){this.on("removedfile",function(a){e.tobesaler.license=""})},url:$.apiUrl+"/upload",paramName:"file",maxFiles:1,maxFilesize:2,acceptedFiles:"image/*",addRemoveLinks:!0,dictResponseError:"上传文件出错！",success:function(a,r){e.tobesaler.license=r.data}}),$("#frsfz").dropzone({url:$.apiUrl+"/upload",paramName:"file",maxFiles:2,maxFilesize:2,acceptedFiles:"image/*",addRemoveLinks:!1,dictResponseError:"上传文件出错！",success:function(a,r){e.tobesaler.legalPersonIDCardImage.push(r.data)}}),$("#zmt").dropzone({url:$.apiUrl+"/upload",paramName:"file",maxFiles:1,maxFilesize:2,acceptedFiles:"image/*",addRemoveLinks:!1,dictResponseError:"上传文件出错！",success:function(a,r){e.tobesaler.legalPersonWithIDCardInHandImage=r.data}}),$("#dzt").dropzone({init:function(){this.on("removedfile",function(a){e.tobesaler.storeAppearance=""})},url:$.apiUrl+"/upload",paramName:"file",maxFiles:1,maxFilesize:2,acceptedFiles:"image/*",addRemoveLinks:!0,dictResponseError:"上传文件出错！",success:function(a,r){e.tobesaler.storeAppearance=r.data}}),$("#dnt").dropzone({url:$.apiUrl+"/upload",paramName:"file",maxFiles:4,maxFilesize:2,acceptedFiles:"image/*",addRemoveLinks:!1,dictResponseError:"上传文件出错！",success:function(a,r){e.tobesaler.storeInsideImages.push(r.data)}}),$("#areafr").dropzone({url:$.apiUrl+"/upload",paramName:"file",maxFiles:2,maxFilesize:2,acceptedFiles:"image/*",addRemoveLinks:!1,dictResponseError:"上传文件出错！",success:function(a,r){e.tobearea.legalPersonIDCardImage.push(r.data)}}),$("#areasfz").dropzone({url:$.apiUrl+"/upload",paramName:"file",maxFiles:1,maxFilesize:2,acceptedFiles:"image/*",addRemoveLinks:!1,dictResponseError:"上传文件出错！",success:function(a,r){e.tobearea.legalPersonWithIDCardInHandImage=r.data}})},createQRcode:function(){var a="http://www.hnylbsc.com/sendpoint.html?uid="+e.info.mobile;if(e.pcode||(e.pcode=$("#customer-private-qrcode").qrcode({render:"canvas",width:140,height:140,text:a})),!e.rcode){var r="http://www.hnylbsc.com/logon.html?rid="+e.info.mobile;e.rcode=$("#logon-qrcode").qrcode({width:280,height:280,text:r,useSVG:!0})}},getUserInfo:function(){$.when($.ajax({url:$.apiUrl+"/user/abstract",type:"GET"})).done(function(r){$.ylbAjaxHandler(r,function(){e.info=r.data,e.tj.referrerMobile=r.data.mobile,a.getJFDHOrder()})})},getApply:function(){$.when($.ajax({url:$.apiUrl+"/applies?k=0",type:"GET"})).done(function(r){$.ylbAjaxHandler(r,function(){e.apply=r.data.applies,a.getOrder()})})},getOrder:function(){$.when($.ajax({url:$.apiUrl+"/givingscore",type:"GET"})).done(function(r){$.ylbAjaxHandler(r,function(){e.order=r.data.orders,a.buildVue()})})},getJFDHOrder:function(){$.when($.ajax({url:$.apiUrl+"/user/orders?k=1",type:"GET"})).done(function(r){$.ylbAjaxHandler(r,function(){e.jfdhlist=r.data.orders,a.getXSXFOrder()})})},getXSXFOrder:function(){$.when($.ajax({url:$.apiUrl+"/user/orders?k=2",type:"GET"})).done(function(r){$.ylbAjaxHandler(r,function(){e.xsxflist=r.data.orders,a.getSJZDOrder()})})},getSJZDOrder:function(){$.when($.ajax({url:$.apiUrl+"/user/orders?k=0",type:"GET"})).done(function(r){$.ylbAjaxHandler(r,function(){e.sjzdlist=r.data.orders,a.getZZSJZDOrder()})})},getZZSJZDOrder:function(){$.when($.ajax({url:$.apiUrl+"/user/orders?k=3",type:"GET"})).done(function(r){$.ylbAjaxHandler(r,function(){e.zzsjzdlist=r.data.orders,a.getReward()})})},getReward:function(){$.when($.ajax({url:$.apiUrl+"/user/transfers",type:"GET"})).done(function(r){$.ylbAjaxHandler(r,function(){e.rlist=r.data.transfers,"CustomerManager"==e.info.role||"AreaManager"==e.info.role||"AM"==e.info.role||"CM"==e.info.role?a.getTotal():a.buildVue()})})},getTotal:function(){$.when($.ajax({url:$.apiUrl+"/user/wage",type:"GET"})).done(function(r){$.ylbAjaxHandler(r,function(){e.total=r.data,"CustomerManager"==e.info.role||"CM"==e.info.role?a.getOrders():"AreaManager"==e.info.role||"AM"==e.info.role?a.getApply():a.buildVue()})})},getOrders:function(){$.when($.ajax({url:$.apiUrl+"/customermanager/givingscore",type:"GET"})).done(function(r){$.ylbAjaxHandler(r,function(){e.customerorders=r.data,a.buildVue()})})},buildVue:function(){e=new Vue({el:"#customer-main",data:e,methods:{selectorder:function(a){switch(a){case 1:e.jfdh=!0,e.sjzd=!1,e.xsxf=!1,e.zzsjzd=!1;break;case 2:e.jfdh=!1,e.sjzd=!1,e.xsxf=!0,e.zzsjzd=!1;break;case 3:e.jfdh=!1,e.sjzd=!0,e.xsxf=!1,e.zzsjzd=!1;break;case 4:e.jfdh=!1,e.sjzd=!1,e.xsxf=!1,e.zzsjzd=!0;break;default:e.jfdh=!0,e.sjzd=!1,e.xsxf=!1,e.zzsjzd=!1}},sendpoints:function(){this.covershow=!0,this.sendshow=!0},spendpoints:function(){this.covershow=!0,this.spendshow=!0},getcode:function(){e.counting||(e.tj.mobile?e.tj.mobile.length<11?$.ylbAlert("手机号码位数不正确"):$.checkIsMobileNumber(e.tj.mobile)?(e.counting=!0,$.ajax({url:$.apiUrl+"/captcha",type:"PUT",data:JSON.stringify({mobile:e.tj.mobile})}).done(function(r){$.ylbAjaxHandler(r,function(){$.ylbAlert("发送成功"),e.countdown=setInterval(a.countDown,1e3)})})):$.ylbAlert("请输入正确手机号"):$.ylbAlert("请输入手机号码"))},hideall:function(){this.covershow=!1,this.sendshow=!1,this.spendshow=!1,this.nagtive=!1,this.ordernagtive=!1,this.zczc=!1},pchange:function(){this.spendpoint.point>this.spendpoint.total&&(this.spendpoint.point=this.spendpoint.total.toFixed(2))},getqrcode:function(){$.ajax({url:$.apiUrl+"/order/shoppingoffline",type:"PUT",data:JSON.stringify({goodsName:e.spendpoint.name,goodsKind:e.spendpoint.type,userMobile:e.spendpoint.mobile,score:e.spendpoint.point,quantity:e.spendpoint.count,totalPrice:e.spendpoint.total})}).done(function(e){$.ylbAjaxHandler(e,function(){var a="http://www.hnylbsc.com/pay.html?oid="+e.data;$("#spendpoint-qrcode").qrcode({render:"canvas",width:240,height:240,text:a})})})},showreject:function(e){alert(e)},setobj:function(a){a.target.value==e.info.mobile&&($.ylbAlert("该手机号码不可用"),$(a.target).focus())},getpoint:function(){$.ajax({url:$.apiUrl+"/score",type:"GET"}).done(function(e){$.ylbAjaxHandler(e,function(){$.ylbAlert("领取成功！"),a.getUserInfo()})})},accepts:function(e){var r=confirm("确认同意该申请？");r&&$.ajax({url:$.apiUrl+"/apply/allow",type:"POST",data:JSON.stringify({applicationID:e})}).done(function(e){$.ylbAjaxHandler(e,function(){$.ylbAlert("操作成功"),a.getApply()})})},selapprove:function(a){1==a?(e.zdsh=!0,e.jssh=!1,e.fzdsh=!1,e.fjssh=!1):2==a?(e.zdsh=!1,e.jssh=!0,e.fzdsh=!1,e.fjssh=!1):3==a?(e.zdsh=!1,e.jssh=!1,e.fzdsh=!0,e.fjssh=!1):4==a&&(e.zdsh=!1,e.jssh=!1,e.fzdsh=!1,e.fjssh=!0)},showreason:function(a){e.nagtive=!0,e.covershow=!0,e.appID=a},showrejectreason:function(e){alert(e)},changerewardway:function(a){var r=$(a.target).find("option:selected").val();e.reward.way=r},reject:function(){$.ajax({url:$.apiUrl+"/apply/reject",type:"POST",data:JSON.stringify({applicationID:e.appID,reason:e.reason})}).done(function(r){$.ylbAjaxHandler(r,function(){$.ylbAlert("操作成功"),e.hideall(),a.getApply()})})},rolechange:function(a){e.role=$(a.target).val()},changeprov:function(r){var n=$(r.target),t=n.val(),o=n.find("option:selected").text();e.tobesaler.provinceCode=t,e.tobesaler.province=o,e.tobearea.provinceCode=t,e.tobearea.province=o,e.alist=[],a.getCity(t)},changecity:function(r){var n=$(r.target),t=n.val(),o=n.find("option:selected").text();e.tobesaler.cityCode=t,e.tobesaler.city=o,e.tobearea.cityCode=t,e.tobearea.city=o,a.getArea(t)},changearea:function(a){var r=$(a.target),n=r.val(),t=r.find("option:selected").text();e.tobesaler.areaCode=n,e.tobesaler.area=t,e.tobearea.areaCode=n,e.tobearea.area=t},apysaler:function(){if(e.isapplyunder){if(!e.tobesaler.idCard)return void $.ylbAlert("请输入法人身份证号");if(!e.tobesaler.storeName)return void $.ylbAlert("请输入店铺名称");if(!e.tobesaler.province)return void $.ylbAlert("请选择省");if(!e.tobesaler.city)return void $.ylbAlert("请选择市");if(!e.tobesaler.area)return void $.ylbAlert("请选择区");if(!e.tobesaler.street)return void $.ylbAlert("请输入详细街道地址");if(!e.tobesaler.legalPerson)return void $.ylbAlert("请输入真实姓名");if(e.tobesaler.storeInsideImages.length<1)return void $.ylbAlert("请上传店铺内饰图");if(!e.tobesaler.storeAppearance)return void $.ylbAlert("请上传店招图");if(!e.tobesaler.license)return void $.ylbAlert("请上传营业执照图");$.ajax({url:$.apiUrl+"/user/merchant",type:"PUT",data:JSON.stringify(e.tobesaler)}).done(function(e){$.ylbAjaxHandler(e,function(){$.ylbAlert("申请成功！"),setTimeout(function(){window.location.href=window.location.href},1500)})})}else $.ylbAlert("阅读地面商家加盟合作条款并勾选已读")},apymanager:function(){if(e.isapplymanager){if(!e.tobearea.applicantName)return void $.ylbAlert("请输入申请人姓名");if(!e.tobearea.province)return void $.ylbAlert("请选择省");if(!e.tobearea.city)return void $.ylbAlert("请选择市");if(!e.tobearea.area)return void $.ylbAlert("请选择区");if(e.tobearea.legalPersonIDCardImage.length<1)return void $.ylbAlert("请上传身份证正反面照");if(!e.tobearea.idCard)return void $.ylbAlert("请输入法人身份证号");$.ajax({url:$.apiUrl+"/user/customermanager",type:"PUT",data:JSON.stringify(e.tobearea)}).done(function(e){$.ylbAjaxHandler(e,function(){$.ylbAlert("申请成功！"),setTimeout(function(){window.location.href=window.location.href},1500)})})}else $.ylbAlert("阅读地面商家加盟合作条款并勾选已读")},cancel:function(e){var r=confirm("确认取消该订单？");r&&$.ajax({url:$.apiUrl+"/order/cancel?orderID="+e,type:"DELETE"}).done(function(e){$.ylbAjaxHandler(e,function(){$.ylbAlert("删除成功"),a.getJFDHOrder()})})},logon:function(){$.ajax({url:$.apiUrl+"/user/register",type:"PUT",data:JSON.stringify(e.tj)}).done(function(a){$.ylbAjaxHandler(a,function(){$.ylbAlert("创建成功"),e.tj.mobile="",e.tj.captcha=""})})},showorderreason:function(a){e.orderID=a,this.covershow=!0,this.ordernagtive=!0},agreeorder:function(e){var r=confirm("确认同意该申请？");r&&$.ajax({url:$.apiUrl+"/givingscore/agree",type:"POST",data:JSON.stringify({orderID:e})}).done(function(e){$.ylbAjaxHandler(e,function(){$.ylbAlert("操作成功"),a.getUserInfo()})})},disagreeorder:function(){$.ajax({url:$.apiUrl+"/givingscore/reject",type:"POST",data:JSON.stringify({orderID:e.orderID,reason:e.orderreason})}).done(function(r){$.ylbAjaxHandler(r,function(){$.ylbAlert("操作成功"),e.hideall(),a.getOrder()})})},recharge:function(){$.ylbConfirm({msg:"请输入充值金额<input type='text' class='recharge'>",callback:function(){var e=$(".recharge").val();$.ajax({url:$.apiUrl+"/order/recharge",type:"PUT",data:JSON.stringify({amount:e})}).done(function(e){$.ylbAjaxHandler(e,function(){window.location.href="pay.html?oid="+e.data})})}})},rewards:function(){e.zczc=!0,e.covershow=!0},selunder:function(a){e.isapplyunder=$(a.target).is(":checked")},selmanager:function(a){e.isapplymanager=$(a.target).is(":checked")},dorewards:function(){var a="";switch(e.reward.way){case"1":a="/transfer/paymentforgoods";break;case"2":a="/transfer/commission";break;case"3":a="/transfer/balance";break;default:a="/transfer/paymentforgoods"}return e.reward.amount?e.reward.account?void $.ajax({url:$.apiUrl+a,type:"PUT",data:JSON.stringify({amount:e.reward.amount,account:e.reward.account,bank:e.reward.bank})}).done(function(a){$.ylbAjaxHandler(a,function(){$.ylbAlert("转出申请成功"),e.hideall(),setTimeout(function(){window.location.href=window.location.href},1500)})}):void $.ylbAlert("请输入账号"):void $.ylbAlert("请输入转出金额")}}}),a.createQRcode(),setTimeout(a.imgUpload(),300)},countDown:function(){e.num>1?(e.num-=1,$(".btn-code").val(e.num+"秒后重新获取")):(e.counting=!1,$(".btn-code").val("重新获取"),e.num=60,clearInterval(e.countdown))}};a.init()}();