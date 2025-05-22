<template>
  <div ref="chartContainer" style="width: 800px; height: 600px"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Highcharts from "highcharts";
import treemapModule from "highcharts/modules/treemap";
import axios from "axios";

// Some bundlers expose the module factory on `default`, others directly export
// the function. Normalize before using it to avoid runtime errors.
const initTreemap =
  typeof treemapModule === "function"
    ? treemapModule
    : treemapModule && typeof treemapModule.default === "function"
    ? treemapModule.default
    : null;

if (initTreemap) {
  initTreemap(Highcharts);
}

const chartContainer = ref(null);
const chart = ref(null);
const chartData = ref([]);

async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3001/api/tree"); // Update the URL if your backend runs elsewhere
    chartData.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderChart() {
  if (chartContainer.value && chartData.value.length > 0) {
    if (chart.value) {
      chart.value.destroy();
    }

    chart.value = Highcharts.chart(chartContainer.value, {
      series: [
        {
          type: "treemap",
          layoutAlgorithm: "squarified",
          allowDrillToNode: true,
          animationLimit: 1000,
          dataLabels: {
            enabled: true,
            align: "left",
            verticalAlign: "top",
            style: {
              fontSize: "15px",
              fontWeight: "bold",
            },
          },
          levels: [
            {
              level: 1,
              dataLabels: {
                enabled: true,
              },
              borderWidth: 3,
            },
          ],
          data: chartData.value.map((item) => ({
            id: String(item.id),
            name: item.name,
            value: item.value,
            parent: item.parent_id ? String(item.parent_id) : null,
          })),
        },
      ],
      title: {
        text: "Treemap Chart",
      },
    });
  }
}

onMounted(async () => {
  await fetchData();
  renderChart();
});

watch(chartData, () => {
  renderChart();
});
</script>