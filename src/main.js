import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import More from 'highcharts/highcharts-more'

More(Highcharts)

Vue.config.productionTip = false
Vue.use(HighchartsVue, Highcharts);

new Vue({
  render: h => h(App),
}).$mount('#app')
