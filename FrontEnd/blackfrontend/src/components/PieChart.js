import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Create a pie chart
    const pie = d3.pie().value((d) => d.intensity);
    const arc = d3.arc().innerRadius(0).outerRadius(radius - 10);

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Set up SVG
    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`) // Set viewBox to ensure the pie chart is responsive
      .attr("preserveAspectRatio", "xMinYMin meet");

    // Create a group element for the pie chart
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create arcs
    const arcs = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Append paths with black borders between segments
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.name))
      .attr("stroke", "black") // Add a black stroke to each arc
      .attr("stroke-width", 1); // Set the stroke width to create borders between segments

    // Append labels with adjusted distance from the center
    const labelDistance = 15; // Adjust this value to increase or decrease the distance from the center

    arcs
      .append("text")
      .attr("transform", (d) => {
        const [x, y] = arc.centroid(d);
        const dist = labelDistance; // Distance from the center
        return `translate(${x * (1 + dist / radius)}, ${
          y * (1 + dist / radius)
        })`;
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text((d) => d.data.name);

    // Cleanup function
    return () => {
      svg.selectAll("*").remove();
    };
  }, [data]);

  return (
   
      <svg ref={svgRef} style={{ borderRadius: "50%" }} />
   
  );
};

export default PieChart;
