(function () {
    var spendpointer = {};
    var m = {
        init: function () {
            m.buildVue();
        },
        buildVue: function () {
            spendpointer = new Vue({
                el: "#spendpoint-main",
                data: spendpointer,
                methods: {
                    createOrder: function () {
                        $.ajax({
                            url:$.apiUrl+"/order/shoppingoffline",
                            type:"PUT",
                            data:JSON.stringify({
                            })
                        })
                    }
                }
            });
        }
    };
    m.init();
})();