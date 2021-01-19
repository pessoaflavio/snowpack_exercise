import * as d3 from "./_snowpack/pkg/d3.js";
import * as d3_arrow from "./_snowpack/pkg/d3-arrow.js";


/*Graph Class creates our viz
Data's passed as an argument to it and it's fetched
on the main index.js
drawPlot method uses d3 and d3 arrow to plot it
*/

export default class Graph {

    constructor(data) {
        this.data = data;
        this.element = d3.select('#graph');
        this.w = '1000px';
        this.h= '600px';
    }
    
    drawPlot() {

        var yScale = d3.scaleLinear()
        .domain([0, 20000])
        .range([580, 40])
        ;

        var xScale = d3.scaleLinear()
        .domain([0, 160])
        .range([40, 980])
        ;


        const arrow = d3_arrow.arrow11()
        .id("my-arrow")
        .attr('stroke-width',2)
        .attr("stroke", "steelblue")
        ;

        /*
        All cx are categorical variables for arrow system
        The arrowx ones are passing 'defs' for the svg basically;
        The defs make it so the line can reference the sytle of the arrow
        */

        let c1 = 'pink', c2 = 'yellow', c3 = 'green', c4 = 'blue', c5 = 'red', c6 = 'orange', c7 = 'grey';        

        const arrow1 = d3_arrow.arrow11()
            .id("arrow1")
            .attr('stroke-width',2)
            .attr("stroke", c1)
        ;

        const arrow2 = d3_arrow.arrow11()
            .id("arrow2")
            .attr('stroke-width',2)
            .attr("stroke", c2)
        ;

        const arrow3 = d3_arrow.arrow11()
            .id("arrow3")
            .attr('stroke-width',2)
            .attr("stroke", c3)
        ;

        const arrow4 = d3_arrow.arrow11()
            .id("arrow4")
            .attr('stroke-width',2)
            .attr("stroke", c4)
        ;
        
        const arrow5 = d3_arrow.arrow11()
            .id("arrow5")
            .attr('stroke-width',2)
            .attr("stroke", c5)
        ;

        const arrow6 = d3_arrow.arrow11()
            .id("arrow6")
            .attr('stroke-width',2)
            .attr("stroke", c6)
        ;

        const arrow7 = d3_arrow.arrow11()
            .id("arrow7")
            .attr('stroke-width',2)
            .attr("stroke", c7)
        ;

        /*
        Defining the variables
        used in the graph
        */

        let ref1 = 'Avg_Cost';
        let ref2 = 'total_jail_pop';
        
        let lineColorPick = function(d) {
                   if ((+d[0][ref1] > +d[1][ref1]) && (+d[0][ref2] > +d[1][ref2])) {
                        return c1
            } else if ((+d[0][ref1] > +d[1][ref1]) && (+d[0][ref2] < +d[1][ref2])) {
                        return c2
            } else if ((+d[0][ref1] > +d[1][ref1]) && (+d[0][ref2] == +d[1][ref2])) {
                        return c3
            } else if ((+d[0][ref1] < +d[1][ref1]) && (+d[0][ref2] > +d[1][ref2])) {
                        return c4
            } else if ((+d[0][ref1] < +d[1][ref1]) && (+d[0][ref2] < +d[1][ref2])) {
                        return c5
            } else if ((+d[0][ref1] < +d[1][ref1]) && (+d[0][ref2] == +d[1][ref2])) {
                        return c6
            }  else {
                        return c7
            }
        }

        let pickArrow = function(d) {
                   if ((+d[0][ref1] > +d[1][ref1]) && (+d[0][ref2] > +d[1][ref2])) {
                        return 'url(#arrow1)'
            } else if ((+d[0][ref1] > +d[1][ref1]) && (+d[0][ref2] < +d[1][ref2])) {
                        return 'url(#arrow2)'
            } else if ((+d[0][ref1] > +d[1][ref1]) && (+d[0][ref2] == +d[1][ref2])) {
                        return 'url(#arrow3)'
            } else if ((+d[0][ref1] < +d[1][ref1]) && (+d[0][ref2] > +d[1][ref2])) {
                        return 'url(#arrow4)'
            } else if ((+d[0][ref1] < +d[1][ref1]) && (+d[0][ref2] < +d[1][ref2])) {
                        return 'url(#arrow5)'
            } else if ((+d[0][ref1] < +d[1][ref1]) && (+d[0][ref2] == +d[1][ref2])) {
                        return 'url(#arrow6)'
            }  else {
                        return 'url(#arrow7)'
            }
        }

        let xAxis = function(group){
            group
            .attr("transform", `translate(0, 580)`)
            .call(d3.axisBottom(xScale))
        }

        let yAxis = function(group){
            group
            .attr("transform", `translate(40,0)`)
            .call(d3.axisLeft(yScale))
        }


        let svg = this.element.append("svg")
        .attr('width',this.w)
        .attr('height',this.h)
        .attr('background-color','lightyellow')
        ;

        /*
        Array copy to get unique cities
        and from there, create arrays of the data for each city
        */

        let counties = [...new Set(this.data.map(x => `${x.county_name} - ${x.state}`))];
        
        let twoDArray = [];
        let ArrControl = [...this.data];
        for (let i = 0; i < counties.length; i++){
            
            let pair = ArrControl.filter(x => `${x.county_name} - ${x.state}` == counties[i]);
            twoDArray.push(pair);

        }

        /*
        Calling the arrow functions
        to add the defs to the svg
        */

        svg.call(arrow1);
        svg.call(arrow2);
        svg.call(arrow3);
        svg.call(arrow4);
        svg.call(arrow5);
        svg.call(arrow6);
        svg.call(arrow7);

        let group1 = svg
        .append('g')
        .attr('class','unit')
        ;
        
        group1
        .selectAll('line')
        .data(twoDArray)
        .enter()
        .append('line')
        .attr('x1',(d) => xScale(d[0][ref1]))
        .attr('y1',(d) => yScale(d[0][ref2]))
        .attr('x2',(d) => xScale(d[1][ref1]))
        .attr('y2',(d) => yScale(d[1][ref2]))
        .attr('stroke-width', '2px')
        .attr('marker-end', (d) => pickArrow(d))
        .attr('stroke', (d) => lineColorPick(d))
        ;

        svg
        .append('g')
        .call(xAxis)
        ;

        svg
        .append('g')
        .call(yAxis)
        ;

    }

}
