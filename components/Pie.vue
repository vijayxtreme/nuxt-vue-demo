<script setup>
import * as d3 from "d3";

import { useBoredStore } from '@/stores/boredStore'
const store = useBoredStore()
await store.getData()
const data = computed(() => store.todos)


onMounted(()=>{
    const svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = Math.min(width, height) / 2;
    
    const color = d3.scaleOrdinal(["gray", "green", "brown"]);


    const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
    const pie = d3.pie().value(function (d) {
        return d.price;
      });

    const path = d3
            .arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

    const label = d3
        .arc()
        .outerRadius(radius)
        .innerRadius(radius - 80);


    const arc = g
        .selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

        arc
        .append("path")
        .attr("d", path)
        .attr("fill", function (d) {
          return color(d.data.activity);
        });

        arc
        .append("text")
        .attr("transform", function (d) {
          return `translate(${label.centroid(d)})`;
        })
        .text(function (d) {
          return d.data.price;
        });

      svg
        .append("g")
        .attr("transform", `translate(${width / 2 - 120},20)`)
        .append("text")
        .text("Activities vs Price")
        .attr("class", "title");
});

</script>

<template>
    I'm a Pie Chart
    <svg></svg>
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
  font-style: italic;
}
</style>