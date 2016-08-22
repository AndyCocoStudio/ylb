(function () {
    var func = {
        rid: $.urlParam("rid")
    };
    var m = {
        init: function () {
            m.buildVue();
            $("header,footer").hide();
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