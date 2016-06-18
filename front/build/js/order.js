(function () {
    var datas = {
        hideaddress: false
    };
    var m = {
        init: function () {
            m.buildVue();
        },
        buildVue: function () {
            datas = new Vue({
                el: '#order-main',
                data: datas,
                methods: {
                    newaddress: function () {
                        datas.hideaddress = !datas.hideaddress;
                    }
                }
            });
        }
    };
    m.init();
})();