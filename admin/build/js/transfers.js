(function () {
	var transfer = {
		ut: true,
		ft: false
	};
	var m = {
		init: function () {
			m.getData();
		},
		getData: function () {
			$.ajax({
				url: $.apiUrl + '/transfers?k=1',
				type: 'GET',
			}).done(function (d) {
				$.ylbAjaxHandler(d, function () {
					transfer.list = d.data.transfers;
					m.buildVue();
				});
			})
		},
		buildVue: function () {
			transfer = new Vue({
				el: '#transfer-main',
				data: transfer,
				methods: {
					agree: function (id) {
						var c = confirm("确认同意该提现申请？");
						if (c) {
							$.ajax({
								url: $.apiUrl + "/transfer/agree",
								type: "POST",
								data: JSON.stringify({ transferID: id })
							}).done(function (d) {
								$.ylbAjaxHandler(d, function () {
									$.ylbAlert("操作成功");
									m.getData();
								})
							})
						}
					},
					disagree: function (id) {
						var c = confirm("确认拒绝该提现申请？");
						if (c) {
							$.ajax({
								url: $.apiUrl + "/transfer/reject",
								type: "POST",
								data: JSON.stringify({ transferID: id })
							}).done(function (d) {
								$.ylbAjaxHandler(d, function () {
									$.ylbAlert("操作成功");
									m.getData();
								})
							})
						}
					},
					togglet: function (i) {
						switch (i) {
							case 1:
								transfer.ut = true;
								transfer.ft = false;
								break;
							case 2:
								transfer.ut = false;
								transfer.ft = true;
								break;
							default:
								transfer.ut = true;
								transfer.ft = false;
								break;
						}
					}
				}
			});
		}
	};
	m.init();
})()