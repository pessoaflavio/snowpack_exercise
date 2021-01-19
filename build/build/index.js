import Graph from './chart.js';
import * as d3 from '../_snowpack/pkg/d3.js';

d3.csv('./data.csv').then(function(data){
    const newGraph = new Graph(data);
    newGraph.drawPlot();
})
