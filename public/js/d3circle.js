(function () {
  'use strict';

  angular.module('myApp.directives')
    .directive('d3Circle', ['d3', function(d3) {
      return {
        restrict: 'EA',
        link: function(scope, iElement, iAttrs) {
          
        var width = 960,
            height = 500,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 70);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.texts; });

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        
        d3.csv("data.csv", function(error, data) {
            data.forEach(function(d) {
                d.texts = +d.texts;
        });
           


          var text1;
          var text2;
          var g = svg.selectAll(".arc")
              .data(pie(data))
            .enter().append("g")
              .attr("class", "arc")

          g.append("path")
              .attr("d", arc)
              .style("fill", function(d) { return color(d.data.mood); })

         
          .on("mouseenter", function(d) {
              var total = d3.sum(data.map(function(d) {                // NEW
              return d.texts;                                           // NEW
            })); 

               var percent = Math.round(1000 * d.data.texts / total) / 10;
              text1 = g.append("text")
                  .attr("translate", arc.centroid(d))
                  .attr("dy", ".5em")
                  .style("text-anchor", "middle")
                  .style("fill", "black")
                  .attr("class", "on")
                  .text(d.data.mood);

               text2 = g.append("text")
                  .attr("translate", arc.centroid(d))
                  .attr("dy", "1")
                  .style("text-anchor", "bottom")
                  .style("fill", "black")
                  .attr("class", "on")
                  .text(d.data.texts);   


          })

            .on("mouseout", function(d) {
                text1.remove();
                text2.remove();
            });    

          /*g.append("text")
              .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .style("text-anchor", "middle")
              .text(function(d) { return d.data.mood; });*/

        });

        }
      };
    }]);

}());