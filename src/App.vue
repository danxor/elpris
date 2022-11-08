<template>
  <div id="app">
    <div class="chart-container">
      <DailyView/>
    </div>
    <div class="chart-container">
      <DailyStatisticsView/>
    </div>
  </div>
</template>

<script>
import DailyView from './components/DailyView.vue'
import DailyStatisticsView from './components/DailyStatisticsView.vue'

export default {
  name: 'App',
  components: {
    DailyView,
    DailyStatisticsView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  color: #cccccc;
  background-color: #2c3e50;
}

.chart-container {
  padding: 1em;
}
</style>
