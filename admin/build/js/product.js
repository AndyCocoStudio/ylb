(function () {
	var product = {
		path: "list",
		goodsid: "",
		detail: {
			goodsID: "",
			name: "",
			price: "",
			weight: "",
			freight: "", //运费，一口价
			thumbnail: [],
			introduceImages: [],
			brief: {
				content: "",
				img: ""
			},
			info: [
				{
					"name": "",
					"value": ""
				}
			],
			deduction: "",
			sku: "",
			vendorID: "",
			status: "", //OnSell 在售,SoldOut 下架
			kind1: "",
			kind1Code: "",
			kind2: "",
			kind2Code: ""
		},
		flist: [],
		slist: [],
	};

	var m = {
		init: function () {
			m.getFlist();
		},
		//获取商品列表
		getData: function () {
			$.when($.ajax({
				url: $.apiUrl + '/goods/query',
				type: 'GET'
			})).done(function (d) {
				$.ylbAjaxHandler(d, function () {
					product.list = d.data;
					m.buildVue();
				});
			});
		},
		//获取一级类目列表
		getFlist: function () {
			$.ajax({
				url: $.apiUrl + '/goods/kinds?all=1',
				type: 'GET',
			}).done(function (d) {
				if (d.result) {
					product.flist = d.data;
					m.getData();
				}
			})
		},
		//图片上传初始化
		imgUpload: function () {
			$("#lbt").dropzone({
				url: $.apiUrl + "/upload",
				paramName: "file",
				maxFiles: 1,
				maxFilesize: 1.0, // MB
				acceptedFiles: "image/*",
				addRemoveLinks: true,
				dictResponseError: '上传文件出错！',
				success: function (file, response) {
					product.detail.thumbnail.push(response.data);
				}
			});
			$("#gst").dropzone({
				url: $.apiUrl + "/upload",
				paramName: "file",
				maxFiles: 1,
				maxFilesize: 1.0, // MB
				acceptedFiles: "image/*",
				addRemoveLinks: true,
				dictResponseError: '上传文件出错！',
				success: function (file, response) {
					product.detail.brief.img = response.data;
				}
			});
			$("#spxqt1").dropzone({
				url: $.apiUrl + "/upload",
				paramName: "file",
				maxFiles: 3,
				maxFilesize: 1.0, // MB
				acceptedFiles: "image/*",
				addRemoveLinks: true,
				dictResponseError: '上传文件出错！',
				success: function (file, response) {
					product.detail.introduceImages.push(response.data);
				}
			});
			$("#spxqt2").dropzone({
				url: $.apiUrl + "/upload",
				paramName: "file",
				maxFiles: 3,
				maxFilesize: 1.0, // MB
				acceptedFiles: "image/*",
				addRemoveLinks: true,
				dictResponseError: '上传文件出错！',
				success: function (file, response) {
					product.detail.introduceImages.push(response.data);
				}
			});
			$("#spxqt3").dropzone({
				url: $.apiUrl + "/upload",
				paramName: "file",
				maxFiles: 3,
				maxFilesize: 1.0, // MB
				acceptedFiles: "image/*",
				addRemoveLinks: true,
				dictResponseError: '上传文件出错！',
				success: function (file, response) {
					product.detail.introduceImages.push(response.data);
				}
			});
		},
		buildVue: function () {
			product = new Vue({
				el: "#product-main",
				data: product,
				methods: {
					//编辑商品
					editGoods: function (id) {
						product.path = 'edit';
						if (id) product.goodsid = id;
					},
					//显示列表
					cancel: function () {
						product.path = 'list';
					},
					//删除商品
					delGoods: function (e) {
						var id = e.target.attributes["data-id"].value;
						$.ajax({
							url: $.apiUrl + '/goods?id=' + id,
							type: 'DELETE',
						}).done(function (d) {
							$.ylbAjaxHandler(d, function () {
								$.ylbAlert("删除成功！");
								m.getData();
							});
						})
					},
					//添加属性
					addparam: function () {
						var n = {
							name: "",
							value: ""
						};
						product.detail.info.push(n);
					},
					delparam: function (i) {
						product.detail.info.splice(i, 1);
					},
					//设置一级类目
					setflist: function (e) {
						var t = $(e.target).find("option:selected").text();
						var c = $(e.target).find("option:selected").val();
						product.kind1 = t;
						product.kind1Code = c;
						$.ajax({
							url: $.apiUrl + '/goods/kinds?all=1&code=' + c,
							type: 'GET',
						}).done(function (d) {
							if (d.result) {
								product.slist = d.data;
							}
						})
					},
					//设置二级类目
					setslist: function (e) {
						var t = $(e.target).find("option:selected").text();
						var c = $(e.target).find("option:selected").val();
						product.kind2 = t;
						product.kind2Code = c;
					},
					//提交商品编辑
					setData: function () {
						var t = "";
						product.goodsid ? t = "POST" : t = "PUT"
						$.ajax({
							url: $.apiUrl + '/goods',
							type: t,
							data: JSON.stringify(product.detail)
						}).done(function (d) {
							$.ylbAjaxHandler(d, function () {
								$.ylbAlert("编辑成功");
								m.getData();
								product.path = "list";
							})
						});
					},
				}
			});
			setTimeout(function () {
				m.imgUpload();
			}, 1000);
		}
	};
	m.init();
})();