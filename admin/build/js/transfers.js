(function() {
		var m = {
			data: {

			},
			inIt: function() {
				m.getData();
			},
			getData: function() {
				$.ajax({
					url: '/api/transfers',
					type: 'get',
				}).done(function(d) {
					if (d.result) {
						console.log(d.result);
						// m.data = d.data;
					}
				})
			},
			bindVue: function() {
				var transfers = new Vue({
					el: '#transfers-main',
					data: m.data,
					methods: {

					}
				});
			}
		};
		m.inIt();
})()