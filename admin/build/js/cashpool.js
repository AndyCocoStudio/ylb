(function () {
    var cash = {
    };
    var m = {
        init: function () {
            m.getCashPool();
        },
        buildEcharts: function () {
            var goods = echarts.init(document.getElementById('goods'));
            var plat = echarts.init(document.getElementById('plat'));
            var service = echarts.init(document.getElementById('service'));
            var goption = {
                title: {
                    text: '货款资金池',
                    subtext: '现金['+cash.pool.PaymentForGoods.cash+'] 佣金['+cash.pool.PaymentForGoods.commission+'] 货款['+cash.pool.PaymentForGoods.paymentForGoods+'] 积分['+cash.pool.PaymentForGoods.score+']',
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
                            { value: cash.pool.PaymentForGoods.cash, name: '现金' },
                            { value: cash.pool.PaymentForGoods.commission, name: '佣金' },
                            { value: cash.pool.PaymentForGoods.paymentForGoods, name: '货款' },
                            { value: cash.pool.PaymentForGoods.score, name: '积分' }
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
                    subtext: '现金['+cash.pool.PlatFormFee.cash+'] 佣金['+cash.pool.PlatFormFee.commission+'] 货款['+cash.pool.PlatFormFee.paymentForGoods+'] 积分['+cash.pool.PlatFormFee.score+']',
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
                            { value: cash.pool.PlatFormFee.cash, name: '现金' },
                            { value: cash.pool.PlatFormFee.commission, name: '佣金' },
                            { value: cash.pool.PlatFormFee.paymentForGoods, name: '货款' },
                            { value: cash.pool.PlatFormFee.score, name: '积分' }
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
                    subtext: '现金['+cash.pool.ServiceFee.cash+'] 佣金['+cash.pool.ServiceFee.commission+'] 货款['+cash.pool.ServiceFee.paymentForGoods+'] 积分['+cash.pool.ServiceFee.score+']',
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
                            { value: cash.pool.ServiceFee.cash, name: '现金' },
                            { value: cash.pool.ServiceFee.commission, name: '佣金' },
                            { value: cash.pool.ServiceFee.paymentForGoods, name: '货款' },
                            { value: cash.pool.ServiceFee.score, name: '积分' }
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
            goods.setOption(goption);
            plat.setOption(poption);
            service.setOption(soption);
            //m.buildVue();
        },
        getCashPool: function () {
            $.when($.ajax({
                url: $.apiUrl + "/statistics/pool",
                type: "GET"
            })).done(function (d) {
                $.ylbAjaxHandler(d, function () {
                    cash = d.data;
                    m.buildVue();
                });
            });
        },
        buildVue: function () {
            cash = new Vue({
                el: "#cashpool-main",
                data: cash,
                methods: {

                }
            });
            m.buildEcharts();
        }
    };
    m.init();
})();