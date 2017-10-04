let firstGroup = d3.select('#myChart')
	.append('g')
	.attr('class', 'firstGroup');

let xScale = d3.scaleBand()
	.rangeRound([0, 800]) // Range is the size in px rounded
	.padding(0.3)
// .align(0.5)
// .domain([0, 800])

let yScale = d3.scaleLinear()
	// .range([0, 20])
	.rangeRound([0, 20])

function renderChart(err, data) {
	// Set the values to the scales/axis
	xScale.domain(data.map(d => d.language))
	yScale.domain(data.map(d => d.speakers))

	let bars = firstGroup
		.selectAll('rect')
		.data(data)

	// Appending the x-axis
	firstGroup
		.append('g')
			.attr('class', 'axis')
			.attr('fill', 'red')
			.attr('transform', 'translate(100,' + 300 + ')')
		.call(d3.axisBottom(xScale))
		.selectAll("text")
			.attr("y", 8)
			.attr("x", 9)
			.attr("dy", ".35em")
			.attr("transform", "rotate(45)")
			.style("text-anchor", "start");


	// Appending the y-axis
	firstGroup
		.append('g')
		.attr('class', 'axis')
		.attr('transform', 'translate(100,' + 100 + ')')
		// .attr('transform', 'rotate(0.1)')
		.call(
		d3.axisLeft(yScale)
			.ticks(10)
		)


	bars
		.enter()
		.append('rect')
		.attr('x', (d, i) => 20 + 20 * i)
		.attr('y', (d, i) => 200 - 5)
		.attr('width', d => xScale.bandwidth())
		.attr('height', d => yScale(d.speakers))
		.attr('fill', 'red')
		.attr('class', 'bar')
		.attr('transform', 'translate(100, 0)')
}

d3.tsv('languages.tsv', renderChart);