(function() {
	var product = {
		"goodsID": "",
		"name": "",
		"price": "",
		"weight": "",
		"freight": "", //运费，一口价
		"thumbnail": [],
		"introduceImages": [],
		"brief": {
			"content": "",
			"img": ""
		},
		"info": [{
			"name": "",
			"value": ""
		}, {
			"name": "",
			"value": ""
		}],
		"deduction": "",
		"sku": "",
		"vendorID": "",
		"status": "", //OnSell 在售,SoldOut 下架
		"kind1": "",
		"kind1Code": "",
		"kind2": "",
		"kind2Code": ""
	};
	var m = {
		data: {
			others: {
				path: 'list',
			},
			goods: {},
			flist: [],
			slist: [],
		},
		init: function() {
			m.getFlist();
			
			
		},
		getData: function () {
			$.ajax({
				url: '/api/goods/query',
				type: 'get',
				success: function(d) {
					if(d.result) {
						m.data.goods = d.data;
						m.buildVue();
					}
				}
			})
		},
		getFlist: function() {
			$.ajax({
				url: '/api/goods/kinds?all=1&code=' + '',
				type: 'get',
			}).done(function(d) {
				if (d.result) {
					m.data.flist = d.data;
					m.getData();
				}
			})
		},
		
		buildVue: function() {
			product = new Vue({
				el: "#product-main",
				data: m.data,
				methods: {
					addGoods: function () {
						product.others.path = 'add';
					},
					editGoods: function () {
						product.others.path = 'edit';
					},
					delGoods: function (e) {
						var id = e.target.id;
						$.ajax({
							url: '/api/goods?id=' + id,
							type: 'DELETE',
						}).done(function(d) {
							if (d.result) 
							{
								alert('删除成功！');
								m.getData();
							}
						})
					},
					cancle: function () {
						product.others.path = 'list';
					},
					getSlist: function(e) {
						var code = e.target.options[e.target.selectedIndex].value;
						$.ajax({
							url: '/api/goods/kinds?all=1&code=' + code,
							type: 'get',
						}).done(function(d) {
							if (d.result) {console.log(product.slist);
								

								product.slist = d.data;
							}
						})
					},
					setData: function() {
						console.log(product.detail);
						$.ajax({
							url: '/api/goods',
							type: 'put',
							data: JSON.stringify(product.detail),
							succuess: function (d) {
								if(d.result) {
									console.log('succuess!!');
								}
							}
						})
					},
				}
			});
		}
	};
	m.init();
})();