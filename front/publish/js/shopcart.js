!function(){var t={checkbox:0,nogoods:!1,canorder:!1},e={init:function(){e.getProduct(),$(".shopcart-count").on("input",function(){var t=$(this);1==t.attr("data-select")&&e.countPrice()}),$.checkFlag()},countPrice:function(){for(var e=0,c=0,o=t.product.length;o>c;c++){var r=t.product[c];if(r.selected){var n=r.price,a=r.count;e+=n*a}}$(".shopcart-price").html(e.toFixed(2))},checkboxselect:function(){var e=0;$("td input[type='checkbox']").each(function(){$(this).is(":checked")&&(e+=1)}),e>0?(t.canorder=!0,e==$("td input[type='checkbox']").length?$("th input[type='checkbox']").attr("checked",!0):$("th input[type='checkbox']").attr("checked",!1)):(t.canorder=!1,$("th input[type='checkbox']").attr("checked",!1))},getProduct:function(){var c=$.localStorageHandler("get","product");c&&"[]"!=c?t.product=$.parseHandler("sj",c):t.nogoods=!0,e.buildVue()},buildVue:function(){t=new Vue({el:"#shopcart-main",data:t,methods:{selectpro:function(c){var o=$(c.target),r=o.attr("data-index");o.is(":checked")?(t.checkbox+=1,t.product[r].selected=1):(t.checkbox-=1,t.product[r].selected=0),e.checkboxselect(),e.countPrice()},add:function(c){var o=$(c.target),r=o.attr("data-index");t.product[r].count+=1,e.countPrice()},reduce:function(c){var o=$(c.target),r=o.attr("data-index"),n=o.next("input");+n.val()-1>0&&(t.product[r].count-=1,e.countPrice())},delpro:function(t){var c=confirm("确认要删除该商品？");if(c){var o=t.target.attributes["data-id"].value;$.ylbRemoveCart("product",o),e.getProduct(),e.checkboxselect(),e.countPrice()}},settle:function(){for(var e=[],c=0;c<t.product.length;c++){var o=t.product[c];o.selected&&(e.push(o),$.ylbRemoveCart("product",o.goodsID))}$.localStorageHandler("set","shopcart",$.parseHandler("js",e)),window.location.href="order.html"}}})}};e.init()}();