import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

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
    const margin = { top: 25, right: 10, bottom: 105, left: 50 }; // Increased left margin for y-axis labels

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
        .attr("transform", "rotate(60)")
        .style("text-anchor", "start")
        .style("overflow", "hidden")
        .style("text-overflow", "ellipsis")
        .style("white-space", "nowrap");

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
      .attr("width", x.bandwidth())
      .on("mouseover", function (event, d) {
        d3.select(this).style("fill", "orange");
        tooltip.style("visibility", "visible").text(d.name);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("fill", "steelblue");
        tooltip.style("visibility", "hidden");
      });

    // Append x-axis group to the chart
    const xAxisGroup = chartSvg.append("g");
    xAxis(xAxisGroup);

    // Tooltip for x-axis labels
    const tooltip = d3
      .select(chartContainerRef.current)
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "#f8f9fa")
      .style("padding", "5px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("font-size", "12px");

    // Cleanup
    return () => {
      svg.selectAll("*").remove();
      chartSvg.selectAll("*").remove();
      tooltip.remove();
    };
  }, [data, scrollPosition]); // Add scrollPosition as a dependency

  const scroll = (direction) => {
    const scrollAmount = 50; // Amount to scroll in pixels
    const container = chartContainerRef.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const newScrollPosition = Math.min(
      Math.max(scrollPosition + direction * scrollAmount, 0),
      maxScrollLeft
    );

    container.scrollLeft = newScrollPosition;
    setScrollPosition(newScrollPosition);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "49%", // Set to 49% width
        height: "400px",
        backgroundColor: "aqua",
        border: "black solid 2px",
        overflow: "hidden", // Hide default scrollbars
      }}
    >
      {/* Fixed y-axis */}
      <svg
        ref={svgRef}
        width={80} // Adjusted width for the y-axis
        height="400"
        style={{ position: "absolute", left: 0, top: 0 }}
      />
      {/* Scrollable chart area */}
      <div
        ref={chartContainerRef}
        style={{
          marginLeft: "50px", // Adjust to match the width of the y-axis
          width: `calc(100% - 80px)`, // Adjust width to account for the y-axis
          overflow: "hidden",
          height: "calc(100% - 40px)", // Adjust height to account for arrow buttons
          backgroundColor: "aqua",
          position: "relative",
          whiteSpace: "nowrap",
          // Hide scrollbar
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // Internet Explorer and Edge
        }}
        onWheel={(e) => scroll(e.deltaY > 0 ? 1 : -1)} // Enable scroll with mouse wheel
      >
        <svg
          width={Math.max(800, data.length * 20)} // Full width to accommodate all bars
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
          backgroundColor: "transparent",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          fontSize: "18px",
          zIndex: 1,
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
          backgroundColor: "transparent",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          fontSize: "18px",
          zIndex: 1,
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default CountryBarChart;
