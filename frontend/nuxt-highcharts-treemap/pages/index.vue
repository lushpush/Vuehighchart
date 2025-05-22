<template>
  <div>
    <h1>Highcharts Treemap</h1>
    <ClientOnly>
      <TreeMapChart />
    </ClientOnly>
  </div>
</template>

<script setup>
import TreeMapChart from "../components/TreeMapChart.vue";
</script>