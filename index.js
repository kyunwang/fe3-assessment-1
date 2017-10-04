let firstGroup = d3.select('#myChart')
	.append('g')
	.attr('class', 'firstGroup');

// Create an ordinal band scale
let xScale = d3.scaleBand()
	.rangeRound([0, 800]) // Range is the size in px rounded
	.padding(0.3)

let yScale = d3.scaleLinear()
	// .range([0, 20])
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

	// Create a variable and set a setup with data for the bars
	let chartBars = firstGroup
		.selectAll('.bar')
		.data(data)

	// Appending the x-axis
	firstGroup
		.append('g') // Set and create the x-axis at the bottom
			.attr('transform', 'translate(100, 300)')
			.attr('class', 'x axis')
			.call(d3.axisBottom(xScale))
			// .call(xAxis)
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


	// What to do when there has yet to be data - enter() - How new data should be displayed
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

	// What to do with unchanged data - How unchanged data should be displayed
	chartBars.attr('fill', 'red')

	// What to do with remove/exited() data - How removed data should be displayed
	chartBars
		.exit()
		.transition().duration(1000).attr('height', 0)
		.remove()

		// firstGroup
		// .exit()
		// .transition().attr('height', 0)
		// .remove()
	


		d3.select("input").on("change", sortChart);

		d3.select('button').on('click', sortChart);
		var sortTimeout = setTimeout(function() {
			d3.select("input").property("checked", true).each(sortChart);
		}, 2000);



		function sortChart() {
			clearTimeout(sortTimeout);
		
			// Copy-on-write since tweens are evaluated after a delay.
			var x0 = xScale.domain(data.sort(this.checked
				 ? function(a, b) { return parseInt(a.speakers, 10) - parseInt(b.speakers, 10); }
				 : function(a, b) { return d3.ascending(a.language, b.language); })
				 .map(function(d) { return d.language; }))
				 .copy();
		
			firstGroup.selectAll(".bar")
				 .sort(function(a, b) { return x0(a.language) - x0(b.language); });
		
			var transition = firstGroup.transition().duration(750),
				 delay = function(d, i) { return i * 50; };
		
			// Sorts the bars
			transition.selectAll(".bar")
				.delay(delay)
				.attr("x", function(d) { return x0(d.language); });
		
			// Sorts the labels
			transition.select(".x.axis")
				.call(d3.axisBottom(xScale))
				.selectAll("g")
					.delay(delay);
		 }
}



d3.tsv('languages.tsv', renderChart);
// d3.tsv('languages.1.tsv', renderChart);