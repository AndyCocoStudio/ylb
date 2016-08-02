(function () {
    var referlogon = {
        rid: $.urlParam("rid")
    };
    var m = {
        init: function () {
            $(".ylb-footer").hide();
            m.buildVue();
        },
        buildVue: function () {
            referlogon = new Vue({
                el: "#referlogon-main",
                data: referlogon
            });
            m.getImg();
        },
        getImg: function () {
            var logonurl = "http://www.hnylbsc.com/logon.html?rid=" + referlogon.rid;
            $('#img').qrcode({
                //render: "canvas",
                width: 300,
                height: 300,
                text: logonurl,
                useSVG: true
            });
        }
    };
    m.init();
})();