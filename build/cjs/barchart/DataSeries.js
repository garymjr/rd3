'use strict';

var PropTypes = require('prop-types');
var React = require('react');
var createReactClass = require('create-react-class');

var BarContainer = require('./BarContainer');

module.exports = createReactClass({

  displayName: 'DataSeries',

  propTypes: {
    _data: PropTypes.array,
    series: PropTypes.array,
    grouped: PropTypes.bool,
    colors: PropTypes.func,
    colorAccessor: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number,
    valuesAccessor: PropTypes.func,
    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
    y0Accessor: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
    hoverAnimation: PropTypes.any, // TODO: prop types?
    xScale: PropTypes.any,
    yScale: PropTypes.any
  },

  _renderBarSeries: function _renderBarSeries() {
    var _this = this;

    var _props = this.props,
        _data = _props._data,
        valuesAccessor = _props.valuesAccessor;

    return _data.map(function (layer, seriesIdx) {
      return valuesAccessor(layer).map(function (segment) {
        return _this._renderBarContainer(segment, seriesIdx);
      });
    });
  },
  _renderBarContainer: function _renderBarContainer(segment, seriesIdx) {
    var _props2 = this.props,
        colors = _props2.colors,
        colorAccessor = _props2.colorAccessor,
        grouped = _props2.grouped,
        hoverAnimation = _props2.hoverAnimation,
        series = _props2.series,
        xScale = _props2.xScale,
        yScale = _props2.yScale;

    var barHeight = Math.abs(yScale(0) - yScale(this.props.yAccessor(segment)));
    var yWidth = yScale(this.props.y0Accessor(segment) + this.props.yAccessor(segment));
    var y = grouped ? yScale(this.props.yAccessor(segment)) : yWidth;
    return React.createElement(BarContainer, {
      height: barHeight,
      width: grouped ? xScale.rangeBand() / series.length : xScale.rangeBand(),
      x: grouped ? xScale(this.props.xAccessor(segment)) + xScale.rangeBand() / series.length * seriesIdx : xScale(this.props.xAccessor(segment)),
      y: this.props.yAccessor(segment) >= 0 ? y : y - barHeight,
      fill: colors(colorAccessor(segment, seriesIdx)),
      hoverAnimation: hoverAnimation,
      onMouseOver: this.props.onMouseOver,
      onMouseLeave: this.props.onMouseLeave,
      dataPoint: {
        xValue: this.props.xAccessor(segment),
        yValue: this.props.yAccessor(segment),
        seriesName: this.props.series[seriesIdx]
      }
    });
  },
  render: function render() {
    return React.createElement(
      'g',
      null,
      this._renderBarSeries()
    );
  }
});