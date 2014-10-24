(function(d3) {
  "use strict";
  d3.chart("Pie", {
    /**
     * Initializer
     */
    initialize: function() {
      //Setup all the defaults
      this.h = this.h || this.base.attr("height") || 300;
      this.w = this.w || this.base.attr("width") || 300;
      this.r = Math.min(this.w, this.h) / 2;
      this.innerR = this.innerR || 0;
      this.color = d3.scale.category20c();
      this.arc = d3.svg.arc()
        .outerRadius(this.r)
        .innerRadius(this.innerR);

      /**
       * Pie chart layout
       */
      this.pie = d3.layout.pie().value(function(d) {
        return d.value;
      });

      /**
       * Create the base for the pie
       */
      this.pieBase = this.base.append("g")
        .classed('arc', true)
        .attr('height', this.h)
        .attr('width', this.w)
        .attr("transform", "translate(" + this.w / 2 + "," + this.h / 2 + ")");

      /**
       * Add a layer for the slices according to the d3.chart documentation
       */
      this.layer("slices", this.pieBase, {
        dataBind: function(data) {
          var chart = this.chart();
          return this.selectAll('path').data(chart.pie(data));
        },
        insert: function() {
          return this.insert('path');
        },
        events: {
          enter: function() {
            var chart = this.chart();
            return this.attr('d', chart.arc)
              .attr('fill', function(d, i) {
                return chart.color(i);
              });
          },
          update: function() {
            var chart = this.chart();
            return this.attr('d', chart.arc)
              .attr('fill', function(d, i) {
                return chart.color(i);
              });
          },
          merge: function () {
            var chart = this.chart();
            return this.attr('d', chart.arc)
              .attr('fill', function(d, i) {
                return chart.color(i);
              });
          },
          exit: function() {
            return this.remove();
          }
        }
      });
    },
    /**
     * Width getter/setter
     * @param  {Number} newWidth The new width
     * @return {Object} this     Reference to the parent object for chaining
     */
    width: function(newWidth) {
      if (arguments.length === 0) {
        return this.w;
      }
      this.w = newWidth;
      this.base.attr("width", this.w);
      return this;
    },
    /**
     * Height getter/setter
     * @param  {Number} newHeight The new height
     * @return {Object} this      Reference to the parent object for chaining
     */
    height: function(newHeight) {
      if (arguments.length === 0) {
        return this.h;
      }
      this.h = newHeight;
      this.base.attr("height", this.h);
      return this;
    },
    /**
     * The outer radius getter/setter
     * @param  {Number} newRadius The new inner radius value
     * @return {Object} this      Reference to the parent object for chaining
     */
    radius: function(newRadius) {
      if (arguments.length === 0) {
        return this.r;
      }
      this.r = newRadius;
      this.arc = d3.svg.arc()
        .outerRadius(this.r)
        .innerRadius(this.innerR);
      return this;
    },
    /**
     * The inner radius getter/setter in case we want to make this into a donut chart
     * @param  {Number} newRadius The new inner radius value
     * @return {Object} this      Reference to the parent object for chaining
     */
    innerRadius: function(newRadius) {
      if (arguments.length === 0) {
        return this.innerR;
      }
      this.innerR = newRadius;
      this.arc = d3.svg.arc()
        .outerRadius(this.r)
        .innerRadius(this.innerR);
      return this;
    }
  });
})(d3);
