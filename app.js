var minYear = d3.min(birthData, d => d.year);
var width = 600;
var height = 600;
var minYear = d3.min(birthData,d=>d.year);
var maxYear = d3.max(birthData,d=>d.year);
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
//here we are making the actual chart
makeGraph(minYear);
d3.select("input")
    .property("min",minYear)
    .property("max", maxYear)
    .property("value", minYear)
    .on("input",function(){
        var value = +d3.event.target.value;
        makeGraph(value);
    })
//update function
function makeGraph(year){
    var yearData = birthData.filter(d=>d.year === year);
    //making the arcs as per births and passing the yearData to get the births
    var arcs = d3.pie()
                .value(d => d.births)
                .sort((a,b)=>{//this will sort the arcs array continent wise such that similar color appear together
                    if(a.continent > b.continent){return -1}
                    else if(a.continent < b.continent){return 1}
                    else if(a.continent === b.continent){return 0};
                })
                (yearData);
    //this will define the outer and inner radius of the arcs
    var path = d3.arc()
                    .outerRadius(width / 2 - 10)
                    .innerRadius(width / 4);
    var update = d3.select(".chart")
                    .selectAll(".arc")
                    .data(arcs);
    //removing any exit data
    update.exit().remove();
    //adding and merging the new data, //we merge to chatch up with the style
    update
        .enter()
        .append('path') 
            .classed('arc', true)
        .merge(update)
            .attr('fill', d => colorScale(d.data.continent))
            .attr('stroke', 'black')
            .attr('d', path);
}













