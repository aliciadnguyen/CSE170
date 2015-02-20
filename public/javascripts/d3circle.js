(function () {
  'use strict';

  angular.module('myApp.directives')
    .directive('d3Circle', ['d3', function(d3) {
      return {
        restrict: 'EA',
        link: function(scope, iElement, iAttrs) {
          // mmood.getAll().success(function(data){
          //     //console.log(scope.data);
          //     scope.data = data;
          //     //console.log(scope.data);
                         
         
       var width = (window.innerWidth < 1280) ? 500 : 600,
        height = (window.innerWidth < 1280) ? 500 : 500,
        radius = Math.min(width, height) / 2;
        var legendRectSize = 40;
        var legendSpacing = 5;
        

        var color = d3.scale.category20b();
        


        var svg = d3.select('#svgPie')
            .append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
            .attr("preserveAspectRatio", "xMinYMin")
            .append("g")
            .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");      
        

        var arc = d3.svg.arc()
            .outerRadius(radius - 100)
            .innerRadius(radius - 20);
        

        var pie = d3.layout.pie()
          .startAngle(1.1*Math.PI)
          .endAngle(3.1*Math.PI)
          .sort(null)
          .value(function(d) { return d.timesUsed; });
        

        var toolTip = d3.select('#svgPie')
          .append('div')
          .attr('class', 'toolTip');
          toolTip.append('div')
          .attr('class', 'defaultCategory');
          toolTip.append('div')
          .attr('class', 'timesUsed');
          toolTip.append('div')
          .attr('class', 'percent');
        

        d3.json('/my-mood', function(error, data) {
          data.forEach(function(d) {
            d.timesUsed = +d.timesUsed;
            d.enabled = true;                                         // NEW
          });
          
          //function to sort arrays
          var combineCategories = function (data) {
          var res = {};

          data.forEach(function (el) {
            res[el.defaultCategory] = (res[el.defaultCategory]) 
              ? res[el.defaultCategory] += +el.timesUsed 
              : +el.timesUsed;
          });

          return Object.keys(res).map(function (el) {
            return {defaultCategory: el, timesUsed: res[el], enabled: true};  
             });
          }

          console.log(combineCategories(data));

          var result = combineCategories(data);
          
          var path = svg.selectAll('path')
            .data(pie(result))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) { 
              return color(d.data.defaultCategory); 
            })                                                        // UPDATED (removed semicolon)
            .each(function(d) { this._current = d; });                // NEW
          

          path.on('mouseover', function(d) {
            var total = d3.sum(result.map(function(d) {
              return (d.enabled) ? d.timesUsed : 0;                       // UPDATED
            }));
            var percent = Math.round(1000 * d.data.timesUsed / total) / 10;
            toolTip.select('.defaultCategory').html(d.data.defaultCategory);
            toolTip.select('.timesUsed').html(d.data.timesUsed); 
            toolTip.select('.percent').html(percent + '%'); 
            toolTip.style('display', 'block');
          });
          
          path.on('mouseout', function() {
            toolTip.style('display', 'none');
          });
    
          path.on('mousemove', function(d) {
            toolTip.style('top', (d3.event.pageY - 110) + 'px')
              .style('left', (d3.event.pageX - 110) + 'px');
          });


          
            
          var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
              var height = legendRectSize + legendSpacing;
              var offset =  height * color.domain().length / 2;
              var horz = -1 * legendRectSize;
              var vert = i * height - offset;
              return 'translate(' + horz + ',' + vert + ')';
            });
            

            legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)                                   
            .style('fill', color)
            .style('stroke', color)                                   // UPDATED (removed semicolon)
            .on('click', function(label) {                            // NEW
              var rect = d3.select(this);                             // NEW
              var enabled = true;                                     // NEW
              var totalEnabled = d3.sum(result.map(function(d) {     // NEW
                return (d.enabled) ? 1 : 0;                           // NEW
              }));                                                    // NEW
              
              if (rect.attr('class') === 'disabled') {                // NEW
                rect.attr('class', '');                               // NEW
              } else {                                                // NEW
                if (totalEnabled < 2) return;                         // NEW
                rect.attr('class', 'disabled');                       // NEW
                enabled = false;                                      // NEW
              }                                                       // NEW
              pie.value(function(d) {                                 // NEW
                if (d.defaultCategory === label) d.enabled = enabled;           // NEW
                return (d.enabled) ? d.timesUsed : 0;                     // NEW
              });                                                     // NEW
              path = path.data(pie(result));                         // NEW
              path.transition()                                       // NEW
                .duration(750)                                        // NEW
                .attrTween('d', function(d) {                         // NEW
                  var interpolate = d3.interpolate(this._current, d); // NEW
                  this._current = interpolate(0);                     // NEW
                  return function(t) {                                // NEW
                    return arc(interpolate(t));                       // NEW
                  };                                                  // NEW
                });                                                   // NEW
            });                                                       // NEW
            
          legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; })
            .style("font-size", "18px");
        }); 


        //});
        }
      };
    }]);

}());