'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

module.exports = createReactClass({

  displayName: 'AxisTick',

  propTypes: {
    scale: PropTypes.func.isRequired,
    orient: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
    orient2nd: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    horizontal: PropTypes.bool,
    tickArguments: PropTypes.array,
    tickValues: PropTypes.array,
    innerTickSize: PropTypes.number,
    outerTickSize: PropTypes.number,
    tickPadding: PropTypes.number,
    tickFormat: PropTypes.func,
    tickStroke: PropTypes.string,
    tickTextStroke: PropTypes.string,
    gridHorizontal: PropTypes.bool,
    gridVertical: PropTypes.bool,
    gridHorizontalStroke: PropTypes.string,
    gridVerticalStroke: PropTypes.string,
    gridHorizontalStrokeWidth: PropTypes.number,
    gridVerticalStrokeWidth: PropTypes.number,
    gridHorizontalStrokeDash: PropTypes.string,
    gridVerticalStrokeDash: PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      innerTickSize: 6,
      outerTickSize: 6,
      tickStroke: '#000',
      tickPadding: 3,
      tickArguments: [10],
      tickValues: null,
      gridHorizontal: false,
      gridVertical: false,
      gridHorizontalStroke: '#D8D7D7',
      gridVerticalStroke: '#D8D7D7',
      gridHorizontalStrokeWidth: 1,
      gridVerticalStrokeWidth: 1,
      gridHorizontalStrokeDash: '5, 5',
      gridVerticalStrokeDash: '5, 5'
    };
  },
  render: function render() {
    var props = this.props;

    var tr = void 0;
    var textAnchor = void 0;
    var textTransform = void 0;
    var tickFormat = void 0;
    var y1 = void 0;
    var y2 = void 0;
    var dy = void 0;
    var x1 = void 0;
    var x2 = void 0;

    var gridStrokeWidth = void 0;
    var gridStroke = void 0;
    var gridStrokeDashArray = void 0;
    var x2grid = void 0;
    var y2grid = void 0;
    var gridOn = false;

    var sign = props.orient === 'top' || props.orient === 'right' ? -1 : 1;
    var tickSpacing = Math.max(props.innerTickSize, 0) + props.tickPadding;

    var scale = props.scale;

    var ticks = void 0;
    if (props.tickValues) {
      ticks = props.tickValues;
    } else if (scale.ticks) {
      ticks = scale.ticks.apply(scale, props.tickArguments);
    } else {
      ticks = scale.domain();
    }

    if (props.tickFormatting) {
      tickFormat = props.tickFormatting;
    } else if (scale.tickFormat) {
      tickFormat = scale.tickFormat.apply(scale, props.tickArguments);
    } else {
      tickFormat = function tickFormat(d) {
        return d;
      };
    }

    var adjustedScale = scale.rangeBand ? function (d) {
      return scale(d) + scale.rangeBand() / 2;
    } : scale;

    // Still working on this
    // Ticks and lines are not fully aligned
    // in some orientations
    switch (props.orient) {
      case 'top':
        tr = function tr(tick) {
          return 'translate(' + adjustedScale(tick) + ',0)';
        };
        textAnchor = 'middle';
        y2 = props.innerTickSize * sign;
        y1 = tickSpacing * sign;
        dy = sign < 0 ? '0em' : '.71em';
        x2grid = 0;
        y2grid = -props.height;
        break;
      case 'bottom':
        tr = function tr(tick) {
          return 'translate(' + adjustedScale(tick) + ',0)';
        };
        textAnchor = 'middle';
        y2 = props.innerTickSize * sign;
        y1 = tickSpacing * sign;
        dy = sign < 0 ? '0em' : '.71em';
        x2grid = 0;
        y2grid = -props.height;
        break;
      case 'left':
        tr = function tr(tick) {
          return 'translate(0,' + adjustedScale(tick) + ')';
        };
        textAnchor = 'end';
        x2 = props.innerTickSize * -sign;
        x1 = tickSpacing * -sign;
        dy = '.32em';
        x2grid = props.width;
        y2grid = 0;
        break;
      case 'right':
        tr = function tr(tick) {
          return 'translate(0,' + adjustedScale(tick) + ')';
        };
        textAnchor = 'start';
        x2 = props.innerTickSize * -sign;
        x1 = tickSpacing * -sign;
        dy = '.32em';
        x2grid = -props.width;
        y2grid = 0;
        break;
      default:
        break;
    }

    if (props.horizontalChart) {
      textTransform = 'rotate(-90)';
      var _ref = [x1, -y1 || 0];
      y1 = _ref[0];
      x1 = _ref[1];


      switch (props.orient) {
        case 'top':
          textAnchor = 'start';
          dy = '.32em';
          break;
        case 'bottom':
          textAnchor = 'end';
          dy = '.32em';
          break;
        case 'left':
          textAnchor = 'middle';
          dy = sign < 0 ? '.71em' : '0em';
          break;
        case 'right':
          textAnchor = 'middle';
          dy = sign < 0 ? '.71em' : '0em';
          break;
        default:
          break;
      }
    }

    if (props.gridHorizontal) {
      gridOn = true;
      gridStrokeWidth = props.gridHorizontalStrokeWidth;
      gridStroke = props.gridHorizontalStroke;
      gridStrokeDashArray = props.gridHorizontalStrokeDash;
    } else if (props.gridVertical) {
      gridOn = true;
      gridStrokeWidth = props.gridVerticalStrokeWidth;
      gridStroke = props.gridVerticalStroke;
      gridStrokeDashArray = props.gridVerticalStrokeDash;
    }

    // return grid line if grid is enabled and grid line is not on at same position as other axis.
    var gridLine = function gridLine(pos) {
      if (gridOn && !(props.orient2nd === 'left' && pos === 0) && !(props.orient2nd === 'right' && pos === props.width) && !((props.orient === 'left' || props.orient === 'right') && pos === props.height)) {
        return React.createElement('line', { style: {
            strokeWidth: gridStrokeWidth,
            shapeRendering: 'crispEdges',
            stroke: gridStroke,
            strokeDasharray: gridStrokeDashArray
          }, x2: x2grid, y2: y2grid
        });
      }
      return null;
    };

    var optionalTextProps = textTransform ? {
      transform: textTransform
    } : {};

    return React.createElement(
      'g',
      null,
      ticks.map(function (tick, idx) {
        return React.createElement(
          'g',
          { key: idx, className: 'tick', transform: tr(tick) },
          gridLine(adjustedScale(tick)),
          React.createElement('line', {
            style: {
              shapeRendering: 'crispEdges',
              opacity: '1',
              stroke: props.tickStroke
            },
            x2: x2,
            y2: y2
          }),
          React.createElement(
            'text',
            _extends({
              strokeWidth: '0.01',
              dy: dy, x: x1, y: y1,
              style: { stroke: props.tickTextStroke, fill: props.tickTextStroke },
              textAnchor: textAnchor
            }, optionalTextProps),
            ('' + tickFormat(tick)).split('\n').map(function (tickLabel, index) {
              return React.createElement(
                'tspan',
                { x: x1 || 0, dy: dy, key: index },
                tickLabel
              );
            })
          )
        );
      })
    );
  }
});