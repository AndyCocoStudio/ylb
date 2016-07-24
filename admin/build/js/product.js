(function () {
	var product = {
		path: "list",
		goodsid: "",
		detail: {
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
			status: "OnSell", //OnSell 在售,SoldOut 下架
			kind1: "",
			kind1Code: "",
			kind2: "",
			kind2Code: ""
		},
		eidt: {
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
			status: "OnSell", //OnSell 在售,SoldOut 下架
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
					product.list = d.data.goodses;
					product.edit = product.list[0];
					m.buildVue();
				});
			});
		},
		//获取单个商品详情
		getGoods: function (id) {
			$.when($.ajax({
				url: $.apiUrl + "/goods?id=" + id,
				type: "GET"
			})).done(function (d) {
				$.ylbAjaxHandler(d, function () {
					$.ajax({
						url: $.apiUrl + '/goods/kinds?all=1&code=' + d.data.kind1Code,
						type: 'GET',
					}).done(function (d) {
						if (d.result) {
							product.slist = d.data;
						}
					})
					product.edit = d.data;
					product.path = 'edit';
				})
			})
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
			$("#lbt1").dropzone({
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
			$("#gst1").dropzone({
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
			$("#spxqt11").dropzone({
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
			$("#spxqt22").dropzone({
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
			$("#spxqt33").dropzone({
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
					//新增商品
					addGoods: function () {
						product.path = 'add';
					},
					//编辑商品
					editGoods: function (id) {
						m.getGoods(id);
					},
					//显示列表
					cancel: function () {
						product.path = 'list';
					},
					//删除商品
					delGoods: function (id) {
						var c = confirm("确认删除该商品？");
						if (c) {
							$.ajax({
								url: $.apiUrl + '/goods?id=' + id,
								type: 'DELETE',
							}).done(function (d) {
								$.ylbAjaxHandler(d, function () {
									$.ylbAlert("删除成功！");
									m.getData();
								});
							});
						}
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
						product.detail.kind1 = t;
						product.detail.kind1Code = c;
						$.ajax({
							url: $.apiUrl + '/goods/kinds?all=1&code=' + c,
							type: 'GET',
						}).done(function (d) {
							if (d.result) {
								product.slist = d.data;
							}
						});
					},
					//设置一级类目
					esetflist: function (e) {
						var t = $(e.target).find("option:selected").text();
						var c = $(e.target).find("option:selected").val();
						product.edit.kind1 = t;
						product.edit.kind1Code = c;
						$.ajax({
							url: $.apiUrl + '/goods/kinds?all=1&code=' + c,
							type: 'GET',
						}).done(function (d) {
							if (d.result) {
								product.slist = d.data;
							}
						});
					},
					//设置二级类目
					setslist: function (e) {
						var t = $(e.target).find("option:selected").text();
						var c = $(e.target).find("option:selected").val();
						product.detail.kind2 = t;
						product.detail.kind2Code = c;
					},
					//设置二级类目
					esetslist: function (e) {
						var t = $(e.target).find("option:selected").text();
						var c = $(e.target).find("option:selected").val();
						product.edit.kind2 = t;
						product.edit.kind2Code = c;
					},
					//新增商品
					newPro: function () {
						$.ajax({
							url: $.apiUrl + '/goods',
							type: "PUT",
							data: JSON.stringify(product.detail)
						}).done(function (d) {
							$.ylbAjaxHandler(d, function () {
								$.ylbAlert("编辑成功");
								m.getData();
								product.path = "list";
								product.detail = {
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
									status: "OnSell", //OnSell 在售,SoldOut 下架
									kind1: "",
									kind1Code: "",
									kind2: "",
									kind2Code: ""
								};
							});
						});
					},
					//编辑商品
					editPro: function () {
						$.ajax({
							url: $.apiUrl + '/goods',
							type: "POST",
							data: JSON.stringify(product.edit)
						}).done(function (d) {
							$.ylbAjaxHandler(d, function () {
								$.ylbAlert("编辑成功");
								product.path = "list";
								m.getData();
							});
						});
					}
				}
			});
			setTimeout(function () {
				m.imgUpload();
			}, 1000);
		}
	};
	m.init();
})();