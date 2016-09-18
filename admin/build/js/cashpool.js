(function () {
    var cash = {
        st: "",
        et: "",
        t1: true,
        t2: false,
        t3: false,
        t4: false,
        goods: {},
        plat: {},
        service: {}

    };
    var m = {
        init: function () {
            m.getCashPool();
        },
        buildEcharts: function () {
            cash.goods = echarts.init(document.getElementById('goods'));
            cash.plat = echarts.init(document.getElementById('plat'));
            cash.service = echarts.init(document.getElementById('service'));
            var goption = {
                title: {
                    text: '货款资金池',
                    subtext: '现金入账[' + cash.info.pool.PaymentForGoods.cash + '] 佣金入账[' + cash.info.pool.PaymentForGoods.commission + '] 货款入账[' + cash.info.pool.PaymentForGoods.paymentForGoods + '] 积分入账[' + cash.info.pool.PaymentForGoods.score + ']',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['现金', '佣金', '货款', '积分']
                },
                series: [
                    {
                        name: '资金比例',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: cash.info.pool.PaymentForGoods.cash, name: '现金' },
                            { value: cash.info.pool.PaymentForGoods.commission, name: '佣金' },
                            { value: cash.info.pool.PaymentForGoods.paymentForGoods, name: '货款' },
                            { value: cash.info.pool.PaymentForGoods.score, name: '积分' }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            var poption = {
                title: {
                    text: '平台费资金池',
                    subtext: '现金入账[' + cash.info.pool.PlatFormFee.cash + '] 佣金入账[' + cash.info.pool.PlatFormFee.commission + '] 货款入账[' + cash.info.pool.PlatFormFee.paymentForGoods + '] 积分入账[' + cash.info.pool.PlatFormFee.score + ']',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['现金', '佣金', '货款', '积分']
                },
                series: [
                    {
                        name: '资金比例',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: cash.info.pool.PlatFormFee.cash, name: '现金' },
                            { value: cash.info.pool.PlatFormFee.commission, name: '佣金' },
                            { value: cash.info.pool.PlatFormFee.paymentForGoods, name: '货款' },
                            { value: cash.info.pool.PlatFormFee.score, name: '积分' }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            var soption = {
                title: {
                    text: '服务费资金池',
                    subtext: '现金入账[' + cash.info.pool.ServiceFee.cash + '] 佣金入账[' + cash.info.pool.ServiceFee.commission + '] 货款入账[' + cash.info.pool.ServiceFee.paymentForGoods + '] 积分入账[' + cash.info.pool.ServiceFee.score + ']',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['现金', '佣金', '货款', '积分']
                },
                series: [
                    {
                        name: '资金比例',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: cash.info.pool.ServiceFee.cash, name: '现金' },
                            { value: cash.info.pool.ServiceFee.commission, name: '佣金' },
                            { value: cash.info.pool.ServiceFee.paymentForGoods, name: '货款' },
                            { value: cash.info.pool.ServiceFee.score, name: '积分' }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            cash.goods.setOption(goption);
            cash.plat.setOption(poption);
            cash.service.setOption(soption);
            //m.buildVue();
        },
        setDate: function () {
            var std = new Pikaday({
                field: document.getElementById('fst'),
                firstDay: 1,
                minDate: new Date('2016-07-01'),
                maxDate: new Date('3020-12-31'),
                yearRange: [2016, 3020]
            });
            var etd = new Pikaday({
                field: document.getElementById('fet'),
                firstDay: 1,
                minDate: new Date('2016-07-01'),
                maxDate: new Date('3020-12-31'),
                yearRange: [2016, 3020]
            });
        },
        getCashPool: function () {
            $.when($.ajax({
                url: $.apiUrl + "/statistics/pool",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    cash.info = d.data;
                    m.buildVue();
                });
            });
        },
        filterCash: function () {
            $.when($.ajax({
                url: $.apiUrl + "/statistics/pool?st=" + cash.st + "&et=" + cash.et,
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    cash.info = d.data;
                    m.buildEcharts();
                });
            });
        },
        buildVue: function () {
            cash = new Vue({
                el: "#cashpool-main",
                data: cash,
                methods: {
                    changetap: function (id) {
                        switch (id) {
                            case 1:
                                this.t1 = true;
                                this.t2 = false;
                                this.t3 = false;
                                this.t4 = false;
                                setTimeout(function () {
                                    cash.goods.resize();
                                }, 200);
                                break;
                            case 2:
                                this.t1 = false;
                                this.t2 = true;
                                this.t3 = false;
                                this.t4 = false;
                                setTimeout(function () {
                                    cash.plat.resize();
                                }, 200);
                                break;
                            case 3:
                                this.t1 = false;
                                this.t2 = false;
                                this.t3 = true;
                                this.t4 = false;
                                setTimeout(function () {
                                    cash.service.resize();
                                }, 200);
                                break;
                            case 4:
                                this.t1 = false;
                                this.t2 = false;
                                this.t3 = false;
                                this.t4 = true;
                                break;
                            default:
                                this.t1 = true;
                                this.t2 = false;
                                this.t3 = false;
                                this.t4 = false;
                                cash.goods.resize();
                                break;
                        }
                    },
                    filtercash: function () {
                        m.filterCash();
                    }
                }
            });
            setTimeout(function () {
                m.buildEcharts();
                m.setDate();
                $.setLeftBar("cashpool");
            }, 200);
        }
    };
    m.init();
})();