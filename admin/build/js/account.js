(function () {
    var account = {
        edita: false,
        cover: false,
        newa: false
    };
    var m = {
        init: function () {
            m.buildVue();
        },
        getRoleList: function () {

        },
        buildVue: function () {
            account = new Vue({
                el: "#account-main",
                data: account,
                methods: {
                    editaccount: function () {
                        account.edita = true;
                        account.cover = true;
                    },
                    hideall: function () {
                        account.edita = false;
                        account.cover = false;
                        account.newa = false;
                    },
                    newaccount:function(){
                        account.newa = true;
                        account.cover = true;
                    }
                }
            })
        }
    };
    m.init();
})();