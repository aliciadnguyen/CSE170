(function () {
  'use strict';

  angular.module('myApp.directives')
    .directive('d3Bar', ['d3', function(d3) {
      return {
        restrict: 'EA',
        link: function(scope, iElement, iAttrs) {
			//Width and height
			var w = 300;
			var h = 300;
			var barPadding = 1;
			
			//to be moved to JSON
			var dataset = [ 5, 10, 13, 30, 21, 70, 22];


			var margin = {top: 20, right: 30, bottom: 30, left: 40},
			    width = 300 - margin.left - margin.right,
			    height = 300 - margin.top - margin.bottom;
			
			//Create SVG element
			var svg = d3.select("#weeklyChart")
						.append("svg")
						.attr("width", w + margin.left + margin.right)
						.attr("height", h + margin.top + margin.bottom)
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var x = d3.scale.ordinal()
			    .domain(["M", "T", "W", "Th", "F", "Sa", "Sun"])
    			.rangeRoundBands([0, width+50], .2, 0);

			var y = d3.scale.linear()
			    .range([h, 0]);
			
			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");

			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left")
			    .ticks(10, "%");

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
					return "rgb(171, 202, " + (d * 10) + ")";
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

		    svg.append("g")
      			.attr("class", "x axis")
      			.attr("transform", "translate(20," + h + ")")
      			.call(xAxis);

			svg.append("g")
			    .attr("class", "y axis")
			    .call(yAxis)
			  	.append("text")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 6)
			    .attr("dy", ".71em")
			    .style("text-anchor", "end")
			    .text("Number of Emojis");

        }
      };
    }]);


angular.module('myApp.directives')
    .directive('d3Bar', ['d3', function(d3) {
      return {
        restrict: 'EA',
        link: function(scope, iElement, iAttrs) {
			//Width and height
			var w = 300;
			var h = 300;
			var barPadding = 1;
			
			//to be moved to JSON
			var dataset = [ 20, 25, 13, 50, 65, 25, 22];

			var margin = {top: 20, right: 30, bottom: 30, left: 40},
			    width = 300 - margin.left - margin.right,
			    height = 300 - margin.top - margin.bottom;
			
			//Create SVG element
			var svg = d3.select("#happyChart")
						.append("svg")
						.attr("width", w + margin.left + margin.right)
						.attr("height", h + margin.top + margin.bottom)
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var x = d3.scale.ordinal()
			    .domain(["M", "T", "W", "Th", "F", "Sa", "Sun"])
    			.rangeRoundBands([0, width+50], .2, 0);

			var y = d3.scale.linear()
			    .range([h, 0]);
			
			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");

			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left");

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
			   .attr("fill", "teal");

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

			svg.append("g")
      			.attr("class", "x axis")
      			.attr("transform", "translate(20," + h + ")")
      			.call(xAxis);

			svg.append("g")
			    .attr("class", "y axis")
			    .call(yAxis)
			  	.append("text")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 6)
			    .attr("dy", ".71em")
			    .style("text-anchor", "end")
			    .text("Percentage of Emoji Use");

        }
      };
    }]);


angular.module('myApp.directives')
    .directive('d3Bar', ['d3', function(d3) {
      return {
        restrict: 'EA',
        link: function(scope, iElement, iAttrs) {
			//Width and height
			var w = 300;
			var h = 300;
			var barPadding = 1;
			
			//to be moved to JSON
			var dataset = [ 30, 10, 40, 19, 5, 14, 45];

			var margin = {top: 20, right: 30, bottom: 30, left: 40},
			    width = 300 - margin.left - margin.right,
			    height = 300 - margin.top - margin.bottom;
			
			//Create SVG element
			var svg = d3.select("#sadChart")
						.append("svg")
						.attr("width", w + margin.left + margin.right)
						.attr("height", h + margin.top + margin.bottom)
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var x = d3.scale.ordinal()
			    .domain(["M", "T", "W", "Th", "F", "Sa", "Sun"])
    			.rangeRoundBands([0, width+50], .2, 0);

			var y = d3.scale.linear()
			    .range([h, 0]);
			
			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");

			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left");

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
			   .attr("fill", "#5254a3");

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

			svg.append("g")
      			.attr("class", "x axis")
      			.attr("transform", "translate(20," + h + ")")
      			.call(xAxis);

			svg.append("g")
			    .attr("class", "y axis")
			    .call(yAxis)
			  	.append("text")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 6)
			    .attr("dy", ".71em")
			    .style("text-anchor", "end")
			    .text("Percentage of Emoji Use");

        }
      };
    }]);

}());