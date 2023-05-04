<script setup>
import * as d3 from "d3";

import { useBoredStore } from '@/stores/boredStore'
const store = useBoredStore()
await store.getData()
const data = computed(() => store.todos)

const rawData = data.value


onMounted(()=>{
    const svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height");
    
    // const color = d3.scaleOrdinal(["gray", "green", "brown"]);

    const x = d3
      .scaleLinear()
      .domain(
        d3.extent(rawData, function (d) {
          console.log(d)
          return d.activity;
        })
      )
      .rangeRound([height, 0]);

    const y = d3
      .scaleLinear()
      .domain(
        d3.extent(rawData, function (d) {
          return d.price;
        })
      )
      .rangeRound([height, 0]);

    const line = d3
      .line()
      .x(function (d) {
        return x(d.activity);
      })
      .y(function (d) {
        return y(d.price);
      });

    const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");  

      g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
});

</script>

<template>
    <svg width="800" height="500"></svg>
</template>

<style>
.arc text {
  font: 12px arial;
  text-anchor: middle;
  color: black;
}

.arc path {
  stroke: #000;
}

.title {
  fill: green;
}
</style>