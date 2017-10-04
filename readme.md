# A mini interactive barchart 
A barchart with the purpose of experimenting and getting familiar with the D3.js API.

## TOC
- [Background](#background)
- [Goals](#goals)
- [Data](#data)
- [Features](#features)
- [How to use](#how-to-use)
- [](#)
- [TODO](#todo)
- [What was hard](#what-was-hard)
- [License](#license)

## Background
This is a barchart, a super simple barchart. The purpose of this,
is to familiarize myself to the D3.js API. In this visualisation multiple interactive elements are
added, for instance dragging the bar around. Albeit these interactions do not
have any value as for experience, but it was for the sake of experimenting.

I have tried to refrain from copy & pasting and looking up examples to initialize the base of the chart.

## Goals
- Learning how to create a simple chart, in this case a barchart, from scratch.
- Learn how the D3.js API works better -- Static functions
- Learn how to make the chart interactive

And to play around with D3.js!

## Data 
!["A picture of the dataset"](linktobeset)

The dataset is about the amount of speakers of a certain language in the format of **TSV** A.K.A **Tab Seperated Values**.
there are two columns in this dataset namely:
- language
- speakers

Both language and speakers are in the type of *string*

Example of the data
```
language	speakers
Korean 77000000
```

## Features
The following D3 API's were used:
- [`d3-request`](https://github.com/d3/d3-request)
	- d3.tsv -- get a tab-separated values (TSV) file
- [`d3-selection`](https://github.com/d3/d3-selection)
	- d3.select -- select an element from the document
	- d3.selectAll -- select multiple elements from the document
	- d3.append -- create, append and select new elements
	- d3.attr -- get or set an attribute.
	- d3.remove -- remove elements from the document
	- d3.enter -- get the enter selection (data missing elements)
	- d3.data -- join element to data
	- d3.text -- get or set the text content
	- d3.mouse -- get the mouse position relative to a given container
	- selection.on -- add or remove event listeners
	- selection.select -- select a descendant element for each selected element
	- selection.selectAll -- select multiple descendants for each selected element
	- selection.exit -- get the exit selection (elements missing data)
	- selection.call -- call a function with this selection
	- selection.style -- get or set a style property
	- selection.on -- add or remove event listeners
	- selection.classed -- get, add or remove CSS classes
	- selection.raise -- reorders each element as the last child of its parent
- [`d3-scale`](https://github.com/d3/d3-scale)
	- d3.scaleBand --  create an ordinal band scale
	- d3.scaleLinear -- create an linear scale
	- d3.domain -- set the input domain
	- d3.range -- set the output range
	- d3.padding -- set padding
	- d3.bandwidth -- get the width of each band
	- continuous.interpolate -- set the output interpolator
	- band.copy -- create a copy of this scale
- [`d3-axis`](https://github.com/d3/d3-axis)
	- d3.axisBottom -- create a new bottom-oriented axis generator
	- d3.axisLeft -- create a new left-oriented axis generator
- [`d3-array`](https://github.com/d3/d3-array)
	- d3.min -- compute the minimum value in an array 
	- d3.max -- compute the maximum value in an array
	- d3.ascending -- compute the natural order of two values.
	- d3.descending -- compute the natural order of two values.
- [`d3-interpolate`](https://github.com/d3/d3-interpolate)
	- d3.interpolateHcl -- interpolate HCL colors
- [`d3-transition`](https://github.com/d3/d3-interpolate)
	- selection.transition -- schedule a transition for the selected elements
	- transition.call -- call a function with this transition
	- transition.delay -- specify per-element delay in milliseconds
	- transition.selectAll -- schedule a transition on the selected elements
	- transition.call -- call a function with this transition
	- transition.delay -- specify per-element delay in milliseconds.
- [`d3-drag`](https://github.com/d3/d3-drag)
	- d3.drag -- create a drag behavior

## How to use

## Code explanation???


## TODO
- [] [GitHub Pages](#github-pages)
- [] Metadata -- Add a description and Url to the repo
- [] [Workflow](#workflow)
- [] Maybe a TOC

- [x] Sorting data
- [] Filter data
- [] Show info on mouse over
- [x] Dragging the bars around
- [] Panning
- [] Zooming

- [] []()
- [] 


## What was hard
The start was hard. I wanted to make a start without copy and pasting nor trying to look too much into examples. (I did check some examples though)
- Understanding how to align everything
- Some abstractions. How did I get access to this, kind of feeling.


## License
MIT © Kang Yun Wang (Kevin Wang)

[variable]: linkto