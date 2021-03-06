'use strict';

var PropTypes = require('prop-types');
var React = require('react');
var createReactClass = require('create-react-class');

var Legend = require('../Legend');
var d3 = require('d3');

module.exports = createReactClass({

  displayName: 'LegendChart',

  propTypes: {
    children: PropTypes.node,
    createClass: PropTypes.string,
    colors: PropTypes.func,
    colorAccessor: PropTypes.func,
    data: PropTypes.array,
    height: PropTypes.node,
    legend: PropTypes.bool,
    legendPosition: PropTypes.string,
    margins: PropTypes.object,
    sideOffset: PropTypes.number,
    svgClassName: PropTypes.string,
    title: PropTypes.node,
    titleClassName: PropTypes.string,
    viewBox: PropTypes.string,
    width: PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      className: 'rd3-legend-chart',
      colors: d3.scale.category20c(),
      colorAccessor: function colorAccessor(d, idx) {
        return idx;
      },
      data: [],
      legend: false,
      legendPosition: 'right',
      sideOffset: 90,
      svgClassName: 'rd3-chart',
      titleClassName: 'rd3-chart-title',
      title: ''
    };
  },
  _renderLegend: function _renderLegend() {
    var props = this.props;

    if (props.legend) {
      return React.createElement(Legend, {
        colors: props.colors,
        colorAccessor: props.colorAccessor,
        data: props.data,
        legendPosition: props.legendPosition,
        margins: props.margins,
        width: props.sideOffset
      });
    }

    return null;
  },
  _renderTitle: function _renderTitle() {
    var props = this.props;

    if (props.title !== '') {
      return React.createElement(
        'h4',
        {
          className: props.titleClassName
        },
        props.title
      );
    }
    return null;
  },
  _renderChart: function _renderChart() {
    var props = this.props;

    return React.createElement(
      'svg',
      {
        className: props.svgClassName,
        height: '100%',
        viewBox: props.viewBox,
        width: '100%'
      },
      props.children
    );
  },
  render: function render() {
    var props = this.props;

    return React.createElement(
      'div',
      {
        className: props.className,
        style: { width: props.width, height: props.height }
      },
      this._renderTitle(),
      React.createElement(
        'div',
        { style: { display: 'table', width: '100%', height: '100%' } },
        React.createElement(
          'div',
          { style: { display: 'table-cell', width: '100%', height: '100%' } },
          this._renderChart()
        ),
        React.createElement(
          'div',
          { style: { display: 'table-cell', width: props.sideOffset, verticalAlign: 'top' } },
          this._renderLegend()
        )
      )
    );
  }
});