import Graph from './chart.js';
import * as d3 from 'd3';

d3.csv('./data.csv').then(function(data){
    const newGraph = new Graph(data);
    newGraph.drawPlot();
})
