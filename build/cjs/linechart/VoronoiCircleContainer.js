'use strict';

var PropTypes = require('prop-types');
var React = require('react');
var createReactClass = require('create-react-class');

var _require = require('react-dom'),
    findDOMNode = _require.findDOMNode;

var shade = require('../utils').shade;
var VoronoiCircle = require('./VoronoiCircle');

module.exports = createReactClass({

  displayName: 'VornoiCircleContainer',

  propTypes: {
    circleRadius: PropTypes.any,
    circleFill: PropTypes.any,
    onMouseOver: PropTypes.any,
    dataPoint: PropTypes.any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      circleRadius: 3,
      circleFill: '#1f77b4',
      hoverAnimation: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      circleRadius: this.props.circleRadius,
      circleFill: this.props.circleFill
    };
  },
  _animateCircle: function _animateCircle() {
    var rect = findDOMNode(this).getElementsByTagName('circle')[0].getBoundingClientRect();
    this.props.onMouseOver.call(this, rect.right, rect.top, this.props.dataPoint);
    this.setState({
      circleRadius: this.props.circleRadius * (5 / 4),
      circleFill: shade(this.props.circleFill, 0.2)
    });
  },
  _restoreCircle: function _restoreCircle() {
    this.setState({
      circleRadius: this.props.circleRadius,
      circleFill: this.props.circleFill
    });
  },
  _drawPath: function _drawPath(d) {
    if (d === undefined) {
      return 'M Z';
    }
    return 'M' + d.join(',') + 'Z';
  },
  render: function render() {
    var props = this.props;

    // animation controller
    var handleMouseOver = void 0;
    var handleMouseLeave = void 0;
    if (props.hoverAnimation) {
      handleMouseOver = this._animateCircle;
      handleMouseLeave = this._restoreCircle;
    } else {
      handleMouseOver = handleMouseLeave = null;
    }

    return React.createElement(
      'g',
      null,
      React.createElement(VoronoiCircle, {
        handleMouseOver: handleMouseOver,
        handleMouseLeave: handleMouseLeave,
        voronoiPath: this._drawPath(props.vnode),
        cx: props.cx,
        cy: props.cy,
        circleRadius: this.state.circleRadius,
        circleFill: this.state.circleFill
      })
    );
  }
});