'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PropTypes = require('prop-types');
var React = require('react');
var createReactClass = require('create-react-class');

var _require = require('react-dom'),
    findDOMNode = _require.findDOMNode;

var Bar = require('./Bar');
var shade = require('../utils').shade;

module.exports = createReactClass({
  displayName: 'exports',


  propTypes: {
    fill: PropTypes.string,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
    dataPoint: PropTypes.any // TODO: prop types?
  },

  getDefaultProps: function getDefaultProps() {
    return {
      fill: '#3182BD'
    };
  },
  getInitialState: function getInitialState() {
    return {
      // fill is named as fill instead of initialFill to avoid
      // confusion when passing down props from top parent
      fill: this.props.fill
    };
  },
  _animateBar: function _animateBar() {
    var rect = findDOMNode(this).getBoundingClientRect();
    this.props.onMouseOver.call(this, rect.right, rect.top, this.props.dataPoint);
    this.setState({
      fill: shade(this.props.fill, 0.2)
    });
  },
  _restoreBar: function _restoreBar() {
    this.props.onMouseLeave.call(this);
    this.setState({
      fill: this.props.fill
    });
  },
  render: function render() {
    var props = this.props;

    return React.createElement(Bar, _extends({}, props, {
      fill: this.state.fill,
      handleMouseOver: props.hoverAnimation ? this._animateBar : null,
      handleMouseLeave: props.hoverAnimation ? this._restoreBar : null
    }));
  }
});