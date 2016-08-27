(function () {
	var transfer = {
		unt: true,
		fnt: false,
		sz: 20,
		ucp: 1,
		ut: 1,
		fcp: 1,
		ft: 1,
		cover: false,
		greason: false,
		reason:"",
		tid: ""
	};
	var m = {
		init: function () {
			m.getData();
		},
		getData: function () {
			$.ajax({
				url: $.apiUrl + '/transfers?k=0&cp=' + transfer.ucp + '&sz=' + transfer.sz,
				type: 'GET',
			}).done(function (d) {
				$.ylbAjaxHandler(d, function () {
					transfer.ulist = d.data.transfers;
					transfer.ut = d.data.totalCount;
					m.getAll();
					//m.buildVue();
				});
			})
		},
		getAll: function () {
			$.ajax({
				url: $.apiUrl + '/transfers?k=1&cp=' + transfer.fcp + '&sz=' + transfer.sz,
				type: 'GET',
			}).done(function (d) {
				$.ylbAjaxHandler(d, function () {
					transfer.flist = d.data.transfers;
					transfer.ft = d.data.totalCount;
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
						var c = confirm("确认已放款？");
						if (c) {
							$.ajax({
								url: $.apiUrl + "/transfer/paid",
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
					disagree: function () {
						$.ajax({
							url: $.apiUrl + "/transfer/op/reject",
							type: "POST",
							data: JSON.stringify({
								transferID: transfer.tid,
								reason: transfer.reason
							})
						}).done(function (d) {
							$.ylbAjaxHandler(d, function () {
								$.ylbAlert("操作成功");
								m.getData();
							})
						});
					},
					showreason: function (id) {
						this.tid = id;
						this.cover = true;
						this.greason = true;
					},
					hideall: function () {
						this.cover = false;
						this.greason = false;
					},
					togglet: function (i) {
						switch (i) {
							case 1:
								transfer.unt = true;
								transfer.fnt = false;
								break;
							case 2:
								transfer.unt = false;
								transfer.fnt = true;
								break;
							default:
								transfer.unt = true;
								transfer.fnt = false;
								break;
						}
					},
					uprev: function () {
                        if (transfer.ucp <= 1) {
                            return;
                        } else {
                            transfer.ucp = +transfer.ucp - 1;
                            m.getData();
                        }
                    },
                    unext: function () {
                        if (transfer.ucp >= Math.ceil(transfer.ut / transfer.sz)) {
                            return;
                        } else {
                            transfer.ucp = +transfer.ucp + 1;
                            m.getData();
                        }
                    },
                    ujump: function () {
                        if (transfer.ucp >= Math.ceil(transfer.ut / transfer.sz)) transfer.ucp = Math.ceil(transfer.ut / transfer.sz);
                        if (transfer.ucp <= 1) transfer.ucp = 1;
                        m.getData();
                    },
					fprev: function () {
                        if (transfer.fcp <= 1) {
                            return;
                        } else {
                            transfer.fcp = +transfer.fcp - 1;
                            m.getData();
                        }
                    },
                    fnext: function () {
                        if (transfer.fcp >= Math.ceil(transfer.ft / transfer.sz)) {
                            return;
                        } else {
                            transfer.fcp = +transfer.fcp + 1;
                            m.getData();
                        }
                    },
                    fjump: function () {
                        if (transfer.fcp >= Math.ceil(transfer.ft / transfer.sz)) transfer.fcp = Math.ceil(transfer.ft / transfer.sz);
                        if (transfer.fcp <= 1) transfer.fcp = 1;
                        m.getData();
                    },
				}
			});
		}
	};
	m.init();
})()