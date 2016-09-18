(function () {
    var kind = {
        chosekind: "",
        chosekindcode: "",
        sublist: [],
        cover: false,
        gnewkind: false,
        parentcode: "",
        newkindname: ""
    };
    var m = {
        init: function () {
            m.getList();
        },
        getList: function () {
            $.when($.ajax({
                url: $.apiUrl + "/kinds",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    kind.list = d.data;
                    m.buildVue();
                });
            })
        },
        getSubList: function (code) {
            $.when($.ajax({
                url: $.apiUrl + "/kinds?code=" + code,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    kind.sublist = d.data;
                });
            })
        },
        buildVue: function () {
            kind = new Vue({
                el: "#kind-main",
                data: kind,
                methods: {
                    hideall: function () {
                        kind.cover = false;
                        kind.gnewkind = false;
                    },
                    showmore: function (el) {
                        var _this = $(el.target);
                        kind.chosekind = _this.attr("data-name");
                        kind.chosekindcode = _this.attr("data-code");
                        m.getSubList(kind.chosekindcode);
                    },
                    shownewkind: function (code) {
                        kind.parentcode = code;
                        kind.cover = true;
                        kind.gnewkind = true;
                    },
                    addkind: function () {
                        $.ajax({
                            url: $.apiUrl + "/kinds",
                            type: "PUT",
                            data: JSON.stringify({
                                name: kind.newkindname,
                                parentCode: kind.parentcode
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("添加成功！");
                                kind.parentcode = "";
                                kind.hideall();
                                m.getList();
                                if (kind.chosekindcode) m.getSubList(kind.chosekindcode);
                            })
                        });
                    },
                    editkind: function (pc, code, name) {
                        $.ajax({
                            url: $.apiUrl + "/kinds",
                            type: "POST",
                            data: JSON.stringify({
                                name: name,
                                parentCode: pc,
                                code: code
                            })
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("添加成功！");
                            })
                        })
                    },
                    delkind: function (code, level) {
                        var c = confirm("确认要删除该类目？");
                        if (c) {
                            var codes = [];
                            codes.push(code);
                            $.ajax({
                                url: $.apiUrl + "/kinds/remove",
                                type: "POST",
                                data: JSON.stringify({
                                    codes: codes
                                })
                            }).done(function (d) {
                                $.ylbAjaxHandler(d, function () {
                                    $.ylbAlert("删除成功！");
                                    if (level == 1) {
                                        m.getList();
                                        kind.chosekindcode = "";
                                    } else {
                                        m.getSubList(kind.chosekindcode);
                                    }
                                })
                            })
                        }
                    }
                }
            });
        }
    };
    m.init();

})();