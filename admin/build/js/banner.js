(function () {
    var banner = {
        update: [
            {
                "areaID": "1",
                "images": [{
                    "brief": "",
                    "image": "",
                    "url": ""
                }]
            },
            {
                "areaID": "2",
                "images": [{
                    "brief": "",
                    "image": "",
                    "url": ""
                }]
            },
            {
                "areaID": "3",
                "images": [{
                    "brief": "",
                    "image": "",
                    "url": ""
                }]
            },
            {
                "areaID": "4",
                "images": [{
                    "brief": "",
                    "image": "",
                    "url": ""
                }]
            },
            {
                "areaID": "5",
                "images": [{
                    "brief": "",
                    "image": "",
                    "url": ""
                }]
            },
            {
                "areaID": "6",
                "images": [{
                    "brief": "",
                    "image": "",
                    "url": ""
                }]
            }
        ]
    };
    var m = {
        init: function () {
            m.getBanner();
        },
        imgUpload: function () {
            $("#banner1").dropzone({
                init: function () {
                    this.on("removedfile", function (file) {
                        banner.update[0].images[0].image = "";
                    });
                },
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: 2.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    banner.update[0].images[0].image = response.data;
                }
            });
            $("#banner2").dropzone({
                init: function () {
                    this.on("removedfile", function (file) {
                        banner.update[1].images[0].image = "";
                    });
                },
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: 2.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    banner.update[1].images[0].image = response.data;
                }
            });
            $("#banner3").dropzone({
                init: function () {
                    this.on("removedfile", function (file) {
                        banner.update[2].images[0].image = "";
                    });
                },
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: 2.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    banner.update[2].images[0].image = response.data;
                }
            });
            $("#banner4").dropzone({
                init: function () {
                    this.on("removedfile", function (file) {
                        banner.update[3].images[0].image = "";
                    });
                },
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: 2.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    banner.update[3].images[0].image = response.data;
                }
            });
            $("#banner5").dropzone({
                init: function () {
                    this.on("removedfile", function (file) {
                        banner.update[4].images[0].image = "";
                    });
                },
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: 2.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    banner.update[4].images[0].image = response.data;
                }
            });
            $("#banner6").dropzone({
                init: function () {
                    this.on("removedfile", function (file) {
                        banner.update[5].images[0].image = "";
                    });
                },
                url: $.apiUrl + "/upload",
                paramName: "file",
                maxFiles: 1,
                maxFilesize: 2.0, // MB
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                dictResponseError: '上传文件出错！',
                success: function (file, response) {
                    banner.update[5].images[0].image = response.data;
                }
            });
        },
        getBanner: function () {
            $.when($.ajax({
                url: $.apiUrl + "/banner",
                type: "GET"
            })).done(function (d) {
                banner.list = d.data;
                banner.update = d.data;
                m.buildVue();
            });
        },
        buildVue: function () {
            banner = new Vue({
                el: "#banner-main",
                data: banner,
                methods: {
                    updatebanner: function () {
                        $.ajax({
                            url: $.apiUrl + "/banner",
                            type: "POST",
                            data: JSON.stringify(banner.update)
                        }).done(function (d) {
                            $.ylbAjaxHandler(d, function () {
                                $.ylbAlert("更新成功！");
                                m.getBanner();
                            });
                        })
                    }
                }
            });
            setTimeout(m.imgUpload, 1000);
        }
    };
    m.init();
})();