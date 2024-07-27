import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const CountryBarChart = ({ data }) => {
  const svgRef = useRef();
  const chartContainerRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const chartContainer = d3.select(chartContainerRef.current);

    const barWidth = 20; // Adjusted bar width to fit country names
    const numBarsToShow = 20; // Number of bars to show at a time
    const width = Math.max(numBarsToShow * barWidth, data.length * barWidth); // Width based on number of bars
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 50 }; // Increased left margin for country labels

    // Set up scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name)) // Correctly map by name
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Set up axes
    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    const yAxis = (g) =>
      g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

    // Remove existing content
    svg.selectAll("*").remove();

    // Append y-axis
    svg.append("g").call(yAxis);

    // Append chart area and x-axis
    const chartSvg = d3.select(chartContainerRef.current.querySelector("svg"));
    chartSvg.selectAll("*").remove(); // Clear existing content

    chartSvg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.name)) // Use the correct attribute here
      .attr("y", (d) => y(d.intensity))
      .attr("height", (d) => y(0) - y(d.intensity))
      .attr("width", x.bandwidth());

    // Append x-axis group to the chart
    const xAxisGroup = chartSvg.append("g");
    xAxis(xAxisGroup);

    // Cleanup
    return () => {
      svg.selectAll("*").remove();
      chartSvg.selectAll("*").remove();
    };
  }, [data]);

  const scroll = (direction) => {
    const scrollAmount = 50; // Amount to scroll in pixels
    const container = chartContainerRef.current;
    container.scrollLeft += direction * scrollAmount;
    setScrollPosition(container.scrollLeft);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "48%",
        height: "400px",
        backgroundColor: "aqua",
        border: 'black solid 2px',
        overflow: "hidden" // Hide default scrollbars
      }}
    >
      {/* Fixed y-axis */}
      <svg
        ref={svgRef}
        width={150} // Width for the y-axis
        height="400"
        style={{ position: "absolute", left: 0, top: 0 }}
      />
      {/* Scrollable chart area */}
      <div
        ref={chartContainerRef}
        style={{
          marginLeft: "4rem", // Adjust to match the width of the y-axis
          width: `calc(100% - 150px)`, // Adjust width to account for the y-axis
          overflow: "hidden",
          height: "400px",
          backgroundColor: "aqua",
          position: "relative",
          whiteSpace: "nowrap"
        }}
      >
        <svg
          width={Math.max(400, data.length * 20)} // Full width to accommodate all bars
          height="400"
        />
      </div>
      {/* Left and Right Arrow Buttons */}
      <button
        onClick={() => scroll(-1)}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          transform: "translateY(0)",
          zIndex: 1,
          backgroundColor: "transparent",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        &lt;
      </button>
      <button
        onClick={() => scroll(1)}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          transform: "translateY(0)",
          zIndex: 1,
          backgroundColor: "transparent",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default CountryBarChart;
