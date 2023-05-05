<template>
  <div ref="chart"></div>
</template>

<script setup>
import * as d3 from "d3";

const props = defineProps(['todos'])

const chart = ref(null)

function drawChart(){

  const data = JSON.parse(JSON.stringify(props.todos))

  const margin = { top: 20, right: 20, bottom: 50, left: 70 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  d3.select(chart.value).selectAll("svg").remove()
  const svg = d3
    .select(chart.value)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const x = d3
    .scaleBand()
    .domain(data.map(d => d.activity))
    .range([0, width])

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.price ?? 0)])
    .range([height, 0]);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));

  svg
	  .selectAll("rect")
	  .data(data)
	  .join("rect")
	  .attr("class", "bar")
	  .attr("x", (d) => x(d.activity))
	  .attr("y", (d) => y(d.price ?? 0))
	  .attr("width", x.bandwidth())
	  .attr("height", (d) => height - y(d.price ?? 0));

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", x.bandwidth())
    .text("Activity");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", "-3em")
    .attr("transform", "rotate(-90)")
    .text("Price");
}


onMounted(() => {
  drawChart()
})
watch(()=>{
  drawChart()
})
</script>