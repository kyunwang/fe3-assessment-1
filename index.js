let firstGroup = d3.select('#myChart')
	.append('g')
	.attr('class', 'firstGroup');

// Create an ordinal band scale
let xScale = d3.scaleBand()
	.rangeRound([0, 800]) // Range is the size in px rounded
	.padding(0.3) 

let yScale = d3.scaleLinear()
	.range([0, 20])
	.rangeRound([0, 20])

let colorScale = d3.scaleLinear()
	.interpolate(d3.interpolateHcl)
	// .range(['blue', 'red'])
	.range([d3.rgb('#007aff'), d3.rgb('#fff500')])

function renderChart(err, data) {
	// Get and set the min & max amount of speakers
	let minSpeakers = d3.min(data, d => parseInt(d.speakers, 10));
	let maxSpeakers = d3.max(data, d => parseInt(d.speakers, 10));

	// Set the values to the scales/axis
	xScale.domain(data.map(d => d.language));
	yScale.domain(data.map(d => d.speakers));
	colorScale.domain([minSpeakers, maxSpeakers]);


	let chartBars = firstGroup
		.selectAll('rect')
		.data(data)

	// Appending the x-axis
	firstGroup
		.append('g') // Set and create the x-axis at the bottom
			.attr('transform', 'translate(100, 300)')
			.call(d3.axisBottom(xScale))
		.selectAll("text") // Setting the labels
			.attr("y", 8)
			.attr("x", 9)
			.attr("dy", ".35em")
			.attr("transform", "rotate(45)")
			.style("text-anchor", "start");

	// Appending the y-axis
	firstGroup
		.append('g') // Set and create the y-axis on the left
			.attr('class', 'axis')
			.attr('transform', 'translate(100, 100)')
			.call(
				d3.axisLeft(yScale)
					// .ticks(10)
			);


	chartBars
		.enter()
		.append('rect')
			.attr('class', 'bar')
			.attr('x', d => xScale(d.language))
			.attr('y', d => yScale(d.speakers) + 100)
			.attr('width', xScale.bandwidth())
			.attr('height', d => 200 - yScale(d.speakers))
			.attr('fill', d => colorScale(parseInt(d.speakers), 10))
			.attr('transform', 'translate(100, 0)');
}

d3.tsv('languages.tsv', renderChart);