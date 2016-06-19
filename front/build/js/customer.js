(function () {
    var datas = {
        covershow: false,
        sendshow: false,
        spendshow: false
    };
    var m = {
        init: function () {
            m.buildVue();
        },
        buildVue: function () {
            datas = new Vue({
                el: "#customer-main",
                data: datas,
                methods: {
                    sendpoints: function () {
                        this.covershow = true;
                        this.sendshow = true;
                    },
                    spendpoints: function () {
                        this.covershow = true;
                        this.spendshow = true;
                    },
                    hideall: function () {
                        this.covershow = false;
                        this.sendshow = false;
                        this.spendshow = false;
                    }
                }
            })
        }
    };
    m.init();
})();