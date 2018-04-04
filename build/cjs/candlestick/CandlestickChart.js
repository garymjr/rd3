'use strict';

var PropTypes = require('prop-types');
var React = require('react');
var createReactClass = require('create-react-class');

var d3 = require('d3');
var utils = require('../utils');
var DataSeries = require('./DataSeries');

var _require = require('../common'),
    Chart = _require.Chart,
    XAxis = _require.XAxis,
    YAxis = _require.YAxis;

var _require2 = require('../mixins'),
    ViewBoxMixin = _require2.ViewBoxMixin,
    CartesianChartPropsMixin = _require2.CartesianChartPropsMixin;

module.exports = createReactClass({

  displayName: 'CandleStickChart',

  propTypes: {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    fillUp: PropTypes.func,
    fillUpAccessor: PropTypes.func,
    fillDown: PropTypes.func,
    fillDownAccessor: PropTypes.func,
    hoverAnimation: PropTypes.bool,
    xAxisFormatter: PropTypes.func,
    xAxisTickInterval: PropTypes.object,
    xAxisTickValues: PropTypes.array,
    yAxisFormatter: PropTypes.func,
    yAxisTickCount: PropTypes.number,
    yAxisTickValues: PropTypes.array
  },

  mixins: [CartesianChartPropsMixin, ViewBoxMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      className: 'rd3-candlestick',
      xAxisClassName: 'rd3-candlestick-xaxis',
      yAxisClassName: 'rd3-candlestick-yaxis',
      data: [],
      fillUp: function fillUp() {
        return '#ffffff';
      },
      fillUpAccessor: function fillUpAccessor(d, idx) {
        return idx;
      },
      fillDown: d3.scale.category20c(),
      fillDownAccessor: function fillDownAccessor(d, idx) {
        return idx;
      },
      hoverAnimation: true,
      margins: { top: 10, right: 20, bottom: 30, left: 45 },
      xAccessor: function xAccessor(d) {
        return d.x;
      },
      yAccessor: function yAccessor(d) {
        return { open: d.open, high: d.high, low: d.low, close: d.close };
      }
    };
  },
  render: function render() {
    var props = this.props;

    var _getDimensions = this.getDimensions(),
        innerWidth = _getDimensions.innerWidth,
        innerHeight = _getDimensions.innerHeight,
        trans = _getDimensions.trans,
        svgMargins = _getDimensions.svgMargins;

    var yOrient = this.getYOrient();
    var domain = props.domain || {};

    if (!Array.isArray(props.data)) {
      props.data = [props.data];
    }
    if (this.props.data && this.props.data.length < 1) {
      return null;
    }
    var flattenedData = utils.flattenData(props.data, props.xAccessor, props.yAccessor);

    var xValues = flattenedData.xValues;
    var yValues = flattenedData.yValues;
    var scales = utils.calculateScales(innerWidth, innerHeight, xValues, yValues, domain.x, domain.y);

    var dataSeries = props.data.map(function (series, idx) {
      return React.createElement(DataSeries, {
        key: idx,
        seriesName: series.name,
        index: idx,
        xScale: scales.xScale,
        yScale: scales.yScale,
        data: series.values,
        fillUp: props.fillUp(props.fillUpAccessor(series, idx)),
        fillDown: props.fillDown(props.fillDownAccessor(series, idx)),
        xAccessor: props.xAccessor,
        yAccessor: props.yAccessor,
        hoverAnimation: props.hoverAnimation
      });
    });

    return React.createElement(
      Chart,
      {
        viewBox: this.getViewBox(),
        width: props.width,
        height: props.height,
        margins: props.margins,
        title: props.title
      },
      React.createElement(
        'g',
        { transform: trans, className: props.className },
        React.createElement(XAxis, {
          xAxisClassName: props.xAxisClassName,
          xScale: scales.xScale,
          xAxisTickValues: props.xAxisTickValues,
          xAxisTickInterval: props.xAxisTickInterval,
          xAxisOffset: props.xAxisOffset,
          tickFormatting: props.xAxisFormatter,
          tickStroke: props.xAxisTickStroke,
          tickTextStroke: props.xAxisTickTextStroke,
          xAxisLabel: props.xAxisLabel,
          xAxisLabelOffset: props.xAxisLabelOffset,
          xOrient: props.xOrient,
          yOrient: yOrient,
          margins: svgMargins,
          width: innerWidth,
          height: innerHeight,
          horizontalChart: props.horizontal,
          gridVertical: props.gridVertical,
          gridVerticalStroke: props.gridVerticalStroke,
          gridVerticalStrokeWidth: props.gridVerticalStrokeWidth,
          gridVerticalStrokeDash: props.gridVerticalStrokeDash
        }),
        React.createElement(YAxis, {
          yAxisClassName: props.yAxisClassName,
          yScale: scales.yScale,
          yAxisTickValues: props.yAxisTickValues,
          yAxisOffset: props.yAxisOffset,
          yAxisTickCount: props.yAxisTickCount,
          tickFormatting: props.yAxisFormatter,
          tickStroke: props.yAxisTickStroke,
          tickTextStroke: props.yAxisTickTextStroke,
          yAxisLabel: props.yAxisLabel,
          yAxisLabelOffset: props.yAxisLabelOffset,
          xOrient: props.xOrient,
          yOrient: yOrient,
          margins: svgMargins,
          width: innerWidth,
          height: props.height,
          horizontalChart: props.horizontal,
          gridHorizontal: props.gridHorizontal,
          gridHorizontalStroke: props.gridHorizontalStroke,
          gridHorizontalStrokeWidth: props.gridHorizontalStrokeWidth,
          gridHorizontalStrokeDash: props.gridHorizontalStrokeDash
        }),
        dataSeries
      )
    );
  }
});