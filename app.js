var minYear = d3.min(birthData, d => d.year);
var width = 600;
var height = 600;
var yearData = birthData.filter(d => d.year === minYear);

var continents = [];
for (var i = 0; i < birthData.length; i++) {
  var continent = birthData[i].continent;
  if (continents.indexOf(continent) === -1) {
    continents.push(continent);
  }
}
//scaling the color based on content
var colorScale = d3.scaleOrdinal()
                   .domain(continents)//this is bunch of colors
                   .range(d3.schemeCategory10);
//the chart have to be in a group to have the center of all 
//the arcs at a single place
d3.select('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')
    .classed('chart', true);
//making the arcs as per births and passing the yearData to get the births
var arcs = d3.pie()
             .value(d => d.births)
             (yearData);
//this will define the outer and inner radius of the arcs
var path = d3.arc()
             .outerRadius(width / 2 - 10)
             .innerRadius(width / 4);
//here we are making the actual chart
d3.select('.chart')
  .selectAll('.arc')
  .data(arcs)
  .enter()
  .append('path')
    .classed('arc', true)
    .attr('fill', d => colorScale(d.data.continent))
    .attr('stroke', 'black')
    .attr('d', path);














