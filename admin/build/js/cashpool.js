(function () {
    var cash = {
        goods: {},
        plat: {},
        service: {}
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
                backgroundColor: '#2c343c',
                title: {
                    text: '货款资金池',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: '资金比例',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            { value: cash.goods.cash, name: '现金' },
                            { value: cash.goods.score, name: '积分' }
                        ].sort(function (a, b) { return a.value - b.value }),
                        roseType: 'angle',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            var poption = {
                backgroundColor: '#2c343c',
                title: {
                    text: '平台费资金池',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: '资金比例',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            { value: cash.plat.cash, name: '现金' },
                            { value: cash.plat.score, name: '积分' }
                        ].sort(function (a, b) { return a.value - b.value }),
                        roseType: 'angle',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            var soption = {
                backgroundColor: '#2c343c',
                title: {
                    text: '服务费资金池',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: '资金比例',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            { value: cash.service.cash, name: '现金' },
                            { value: cash.service.score, name: '积分' }
                        ].sort(function (a, b) { return a.value - b.value }),
                        roseType: 'angle',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
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
                    cash.goods = d.data[2];
                    cash.plat = d.data[1];
                    cash.service = d.data[0];
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