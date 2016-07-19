(function () {
    var login = {};
    var m = {
        init: function () {
            m.buildVue();
        },
        buildVue: function () {
            login = new Vue({
                el: "#login-main",
                data: login,
                methods: {}
            });
        }
    };
    m.init();
})();