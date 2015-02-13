(function () {
  'use strict';

  angular.module('myApp.directives')
    .directive('d3Bar', ['d3', function(d3) {
      return {
        restrict: 'EA',
        link: function(scope, iElement, iAttrs) {
			//Width and height
			var w = 300;
			var h = 200;
			var barPadding = 1;
			
			//to be moved to JSON
			var dataset = [ 5, 10, 13, 19, 21, 25, 22];
			
			//Create SVG element
			var svg = d3.select("#chart")
						.append("svg")
						.attr("width", w)
						.attr("height", h)
						;

			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return i * (w / dataset.length);
			   })
			   .attr("y", function(d) {
			   		return h - (d * 4);
			   })
			   .attr("width", w / dataset.length - barPadding)
			   .attr("height", function(d) {
			   		return d * 4;
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + (d * 10) + ")";
			   });

			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
			   })
			   .attr("y", function(d) {
			   		return h - (d * 4) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");

        }
      };
    }]);

}());