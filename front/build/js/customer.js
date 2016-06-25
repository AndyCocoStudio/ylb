(function () {
    var customer = {
        covershow: false,
        sendshow: false,
        spendshow: false,
        sid: $.getID()
    };
    var m = {
        init: function () {
            $.checkSession();
            m.getUserInfo();
        },
        getUserInfo: function () {
            $.when($.ajax({
                url: $.apiUrl + "/user/detail",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    alert(1);
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            customer = new Vue({
                el: "#customer-main",
                data: customer,
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