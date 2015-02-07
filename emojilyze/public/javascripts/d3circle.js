(function () {
  'use strict';

  angular.module('myApp.directives')
    .directive('d3Circle', ['d3', function(d3) {
      return {
        restrict: 'EA',
        link: function(scope, iElement, iAttrs) {
          
         d3.csv("data.csv", function(error, data) {
            data.forEach(function(d) {
                d.texts = +d.texts;
        });  
          
        var width = (window.innerWidth < 1280) ? 400 : 600,
        height = (window.innerWidth < 1280) ? 400 : 500,
        radius = Math.min(width, height) / 2;


        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);


        

        var arc = d3.svg.arc()
            .outerRadius(radius - 50)
            .innerRadius(radius - 20);

        var pie = d3.layout.pie()
            .sort(null)
            .startAngle(1.1*Math.PI)
            .endAngle(3.1*Math.PI)
            .value(function(d) { return d.texts; });

         var svg = d3.select("#svgPie")
            .append("svg")
            .attr("width", '40%')
            .attr("height", '40%')
            .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
            .attr("preserveAspectRatio", "xMinYMin")
            .append("g")
            .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");


        
          var text1;
          var text2;
          var g = svg.selectAll('g')
            .data(pie(data))
            .enter()
            .append("g")
            .attr("d", "arc")
            .attr('fill', function(d, i) { 
              return color(d.data.mood); 
            });

          g.append("path")
              .style("fill", function(d) { return color(d.data.mood); })
              .transition().delay(function(d, i) { return i * 500; }).duration(500)
                .attrTween('d', function(d) {
                  var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                    return function(t) {
                    d.endAngle = i(t);
                    return arc(d);
                }
              });

         
          g.on("mouseover", function(d) {
              var total = d3.sum(data.map(function(d) {                // NEW
              return d.texts;                                           // NEW
            })); 

              var percent = Math.round(1000 * d.data.texts / total) / 10;
              text1 = g.append("text")
                  .attr("translate", arc.centroid(d))
                  .attr("dy", ".5em")
                  .attr("font-size", "30px")
                  .style("text-anchor", "middle")
                  .style("fill", "black")
                  .attr("class", "on")
                  .text(d.data.mood);

               text2 = g.append("text")
                  .attr("translate", arc.centroid(d))
                  .attr("dy", "45")
                  .attr("font-size", "30px")
                  .style("text-anchor", "middle")
                  .style("fill", "black")
                  .attr("class", "on")
                  .text(percent + '%');   


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