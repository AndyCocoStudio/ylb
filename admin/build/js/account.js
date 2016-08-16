(function () {
    var account = {
        edit: false,
        cover: false,

    };
    var m = {
        init: function () {
            m.buildVue();
        },
        getRoleList:function(){

        },
        buildVue: function () {
            account = new Vue({
                el: "#account-main",
                data: account,
                methods: {
                    editaccount: function () {
                        account.edit = true;
                        account.cover = true;
                    },
                    hideall: function () {
                        account.edit = false;
                        account.cover = false;
                    }
                }
            })
        }
    };
    m.init();
})();