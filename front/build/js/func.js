(function () {
    var func = {
        mobile: $.urlParam("mobile")
    };
    var m = {
        init: function () {
            m.buildVue();
        },
        buildVue: function () {
            func = new Vue({
                el: "#func-main",
                data: func,
                methods: {

                }
            });
        }
    };
    m.init();
})();