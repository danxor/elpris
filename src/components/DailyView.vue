<template>
    <div id="chart-box">
        <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>
  
<script>
    import axios from 'axios';

    export default {
        name: 'DailyView',
        data() {
            return {
                chartOptions: {
                    chart: {
                        type: 'spline',
                        scrollablePlotArea: {
                            minWidth: 600,
                            scrollPositionX: 1
                        }
                    },
                    title: {
                        text: 'Dagens elpris'
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Pris (öre/kWh)'
                        },
                        plotLines: []
                    },
                    tooltip: {
                        valueSuffix: ' öre / kWh'
                    },
                    plotOptions: {
                        spline: {
                            lineWidth: 5,
                            states: {
                                hover: {
                                    lineWidth: 10
                                }
                            },
                            marker: { enabled: false }
                        }
                    },
                    series: []
                }
            };
        },
        mounted() {
            this.fillData();
        },
        methods: {
            async fillData() {
                await axios.get('/data/daily.json')
                        .then((response) => {
                            console.log(response.data);

                            this.chartOptions.plotOptions.spline.pointInterval = response.data.pointInterval;
                            this.chartOptions.plotOptions.spline.pointStart = Date.parse(response.data.pointStart);

                            this.chartOptions.yAxis.plotLines.push({
                                value: response.data.average,
                                width: 3,
                                zIndex: 4
                            });

                            for(var i = 0; i < response.data.series.length; i++) {
                                this.chartOptions.series.push(response.data.series[i]);
                            }
                        });
            }
        }
    }
</script>

<style scoped>
    #chart-box {
        width: 90%;
        height: 25%;
        margin: 0 auto;
        border: 1px solid black;
    }
</style>
