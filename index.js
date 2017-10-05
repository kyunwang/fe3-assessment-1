// Get #myChart and append a <g> with a class
const firstGroup = d3.select('#myChart')
	.append('g')
	.attr('class', 'firstGroup');

// Create an ordinal band scale
const xScale = d3.scaleBand()
	.range([0, 800]) // Range is the size in px
	.padding(0.3);

// Create a linear scale - Using rangeRound makes no difference atm
const yScale = d3.scaleLinear()
	.range([0, 20]);

const colorScale = d3.scaleLinear()
	.interpolate(d3.interpolateHcl) //Hue Chroma Luminence - Chose this because it gives a different colourscheme than rgb ^^
	.range([d3.rgb('#007aff'), d3.rgb('#fff500')]);

// Global 'controls' to align the chart
const translateY = 25;
const translateX = 100;

/*
=================
===
=== Add the zoom/pan behaviour
===
=================
*/

// D3 provides the zooming and scaling so that we do not have to do that
const zoomCallback = group =>
() => group.attr('transform', d3.event.transform);

// Create zoom behaviour
const zoomBehaviour = d3.zoom()
.scaleExtent([0, 20]) // Customise zoom behaviour (minScale, maxScale)
.on('zoom', zoomCallback(firstGroup));

// Adding the behaviour to
d3.select('#myChart')
.call(zoomBehaviour)


// The function for rendering the chart
function renderChart(err, data) {
	// Get and set the min & max amount of speakers
	let minSpeakers = d3.min(data, d => parseInt(d.speakers, 10));
	let maxSpeakers = d3.max(data, d => parseInt(d.speakers, 10));

	// Create a variable and set a setup with data for the bars
	let chartBars = firstGroup
		.selectAll('.bar')
		.data(data);

	// Set the values to the scales/axis
	xScale.domain(data.map(d => d.language));
	yScale.domain(data.map(d => d.speakers));
	colorScale.domain([minSpeakers, maxSpeakers]);

	// Appending the x-axis
	firstGroup.append('g') // Set and create the x-axis at the bottom
		.attr('transform', `translate(${translateX}, ${200 + translateY})`)
		.attr('class', 'axis axis-x')
		.call(d3.axisBottom(xScale))
		// .call(xAxis)
		.selectAll("text") // Setting the labels
		.attr("y", 8)
		.attr("x", 9)
		.attr("dy", ".35em")
		.attr("transform", "rotate(45)")
		.style("text-anchor", "start");
		
	// Appending the y-axis
	firstGroup.append('g') // Set and create the y-axis on the left
		.attr('class', 'axis axis-y')
		.attr('transform', `translate(${translateX}, ${0 + translateY})`)
		.call(d3.axisLeft(yScale));
	

	// What to do when there has yet to be data - enter() - How new data should be displayed
	chartBars.enter()
		.append('rect')
			.attr('class', 'bar')
			.attr('x', d => xScale(d.language) + translateX)
			.attr('y', d => yScale(d.speakers) + translateY)
			.attr('width', xScale.bandwidth())
			.attr('height', d => 200 - yScale(d.speakers))
			.attr('fill', d => colorScale(parseInt(d.speakers), 10))
			// .on('mouseover', function(e) {
				// console.log('hello');
			// })
			.call(d3.drag()
				.on("start", dragStart)
				.on("drag", dragging)
				.on("end", dragEnd))

	// What to do with unchanged data - How unchanged data should be displayed
		// chartBars.attr('fill', 'red');
	
	// What to do with remove/exited() data - How removed data should be displayed
	chartBars.exit()
		.transition()
		.duration(1000)
		.attr('height', 0)
		.remove();

	// Event Handlers
	d3.selectAll('.btn-sort')
		.on('click', function(e) {
			return sortChart(data, this.getAttribute('data-type'))
		});
}
	


/*
=================
===
=== Sort function
=== Source: https://bl.ocks.org/mbostock/3885705
=== modified
=================
*/

// Getting the type to sort and return the array
function getSortType(data, type) {
	switch (type) {
		case 'a-z':
			return (a, b) => d3.ascending(a.language, b.language);
		case 'z-a':
			return (a, b) => d3.descending(a.language, b.language);
		case 'h-to-l':
			return (a, b) => parseInt(b.speakers, 10) - parseInt(a.speakers, 10);
		case 'l-to-h':
			return (a, b) => parseInt(a.speakers, 10) - parseInt(b.speakers, 10);
		default:
			// Does nothing with the data
			return data;
		return;
	}
}

function sortChart(data, type) {
	let sorting = xScale.domain(data.sort(
		getSortType(data, type))
		.map(d => d.language))
		.copy();

	firstGroup.selectAll(".bar")
			.sort((a, b) => sorting(a.language) - sorting(b.language));

	// Set the transition
	let transition = firstGroup
		.transition()
		.duration(750);

	// Set a delay between each item
	function delay(d, i) { return i * 50 };

	// Sorts the bars
	transition.selectAll(".bar")
		.delay(delay)
		.attr("x", d => sorting(d.language) + 100);

	// Sorts the labels
	transition.select(".x.axis")
		.call(d3.axisBottom(xScale))
		.selectAll("g")
			.delay(delay);
}


/*
=================
===
=== Drag functions
=== Source: https://bl.ocks.org/mbostock/22994cc97fefaeede0d861e6815a847e
=== Reset source: https://stackoverflow.com/questions/35229022/reset-position-in-dragended-event
=== modified
=================
*/

// Global file to get the origin coordinates to transition to in dragEnd
let x, y;

function dragStart(d) {
	// Set the origin coordinates to reset to when releasing.
	x = this.getAttribute('x');
	y = this.getAttribute('y');

	// Set a class to 'this'
	d3.select(this)
		.raise()
		.classed("isDragging", true);
}

function dragging(d) {
	// Because d3.event.x does not reset to origin coors
	let coors = d3.mouse(this.parentNode);
	let getCoors = {
		x: coors[0],
		y: coors[1]
	};

	d3.select(this)
		.attr("x", d.x = getCoors.x)
		.attr("y", d.y = getCoors.y);
}

function dragEnd(d) {
	let transition = firstGroup
		.transition()
		.duration(500);

	// Transition back to origin coordinates
	transition.select('.isDragging')
		.attr('x', x)
		.attr('y', y);

	// Remove the class - setting to false
	d3.select(this)
		.classed("isDragging", false);
}

d3.tsv('languages.tsv', renderChart);