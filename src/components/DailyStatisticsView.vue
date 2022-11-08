<template>
    <div id="daily-statistics">
        <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>
  
<script>
    import axios from 'axios';

    export default {
        name: 'DailyStatisticsView',
        data() {
            return {
                chartOptions: {
                    chart: {
                        type: 'boxplot'
                    },
                    title: {
                        text: ''
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        categories: [
                            '00 - 01', '01 - 02', '02 - 03', '03 - 04', '04 - 05', '05 - 06',
                            '06 - 07', '07 - 08', '08 - 09', '09 - 10', '10 - 11', '11 - 12',
                            '12 - 13', '13 - 14', '14 - 15', '15 - 16', '16 - 17', '17 - 18',
                            '18 - 19', '19 - 20', '20 - 21', '21 - 22', '22 - 23', '23 - 00'
                        ],
                        title: {
                            text: 'Klockslag'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Pris (öre / kWh)'
                        },
                        plotLines: []
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
                await axios.get('/data/daily-stats.json')
                        .then((response) => {
                            this.chartOptions.title.text = response.data.name;

                            this.chartOptions.yAxis.plotLines.push({
                                value: response.data.average,
                                color: 'red',
                                width: 1,
                                label: {
                                    text: 'Medelvärde: ' + response.data.average + ' öre / kWh',
                                    align: 'center',
                                    style: {
                                        color: 'gray'
                                    }
                                },
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
    #daily-statistics {
        width: 90%;
        height: 25%;
        margin: 0 auto;
        border: 1px solid black;
    }
</style>
