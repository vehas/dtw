import {
  inc, dec
}
from './actions';
import randarr from './rand'
require('./seedrandom.min.js');
require('./d3.v3.min.js');

var matrix = require('./gl-matrix.js');

function gid(id) {
  return document.getElementById(id);
}

function gidh(id) {
  return gid(id).innerHTML;
}
window.onload = function() {
  let d1 = randarr(10, 1, 0, "randommm");
  gid('d1').innerHTML = d1;
  let d2 = d1.slice(2, 10);
  d2.push(1.1);
  d2.push(1.1);
  gid('d2').innerHTML = d2;
  let m4 = [1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
  ];
  let m2 = [1, 0, 0, 0];
  // console.log(m4);
  let mat4 = matrix.mat4.create();
  let out = [];
  let e = matrix.mat4.multiply(out, m2, mat4);
  // console.log(out);
  let eqCanvas = d3.select("#eqCanvas")
    .append("svg");

  eqCanvas.attr("width", 250)
    .attr("height", 250)
    .attr("class", "ui container");

  let circles = eqCanvas.selectAll("circle")
    .data(dataPlot(4, 250, 250))
    .enter()
    .append("circle");
  let offset = 10;
  circles.attr("r", (d, i) => 10)
    .attr("cy", (d) => d[0])
    .attr("cx", (d) => d[1])
    .attr("fill", "teal")
    .attr("stroke", "orange")
    .attr("stroke-width", (d) => 3)
    .on("mousedown", (d) => {
      this.attr("fill", "orange")
      console.log('down');
      let m = d3.mouse(d3.select("#eqCanvas").node());
      let line = eqCanvas.append("line")
        .attr("style", "stroke:orange;stroke-width:8")
        .attr("x1", m[0] - offset)
        .attr("y1", m[1])
        .attr("x2", m[0] - offset)
        .attr("y2", m[1]);
      eqCanvas.on("mousemove", () => {
        var m = d3.mouse(d3.select("#eqCanvas").node());
        line.attr("x2", m[0] - offset)
          .attr("y2", m[1]);
      });
    })
    .on("mouseup", (d) => {
      console.log('up')
      eqCanvas.on("mousemove", null);
    });
  // .on("drag", (d) => console.log('drag'))
  // .on("dragend", (d) => console.log('drag end'));
  // console.log(dataPlot(4, 250, 250));
}

function dataPlot(n, w, h) {
  let arr = new Array(n).fill(0);
  let onetoN = new Array(n).fill(0);
  // console.log("one to N: ", onetoN);
  arr = arr.map((_, i) => w / (n + 1) * (i + 1))
    .map(x => onetoN.map((_, oi) => [x, h / (n + 1) * (oi + 1)]));
  arr = [].concat.apply([], arr);
  return arr
}
