'use strict';

var PropTypes = require('prop-types');
var React = require('react');
var createReactClass = require('create-react-class');

module.exports = createReactClass({
  displayName: 'exports',


  propTypes: {
    cx: PropTypes.number,
    cy: PropTypes.number,
    r: PropTypes.number,
    fill: PropTypes.string,
    className: PropTypes.string,
    voronoiRef: PropTypes.any // TODO: prop types?
  },

  getDefaultProps: function getDefaultProps() {
    return {
      fill: '#1f77b4'
    };
  },
  getInitialState: function getInitialState() {
    // state for animation usage
    return {
      circleRadius: this.props.r,
      circleColor: this.props.fill
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var props = this.props;
    // The circle reference is observed when both it is set to
    // active, and to inactive, so we have to check which one
    props.voronoiRef.observe(function () {
      var circleStatus = props.voronoiRef.cursor().deref();
      var seriesName = props.id.split('-')[0];
      if (circleStatus === 'active') {
        _this._animateCircle(props.id);
        var voronoiSeriesCursor = props.structure.cursor('voronoiSeries');
        if (voronoiSeriesCursor) {
          voronoiSeriesCursor.cursor(seriesName).update(function () {
            return 'active';
          });
        }
      } else if (circleStatus === 'inactive') {
        _this._restoreCircle(props.id);
        props.structure.cursor('voronoiSeries').cursor(seriesName).update(function () {
          return 'inactive';
        });
      }
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    this.props.voronoiRef.destroy();
  },
  _animateCircle: function _animateCircle() {
    this.setState({
      circleRadius: this.state.circleRadius * (5 / 4)
    });
  },
  _restoreCircle: function _restoreCircle() {
    this.setState({
      circleRadius: this.props.r
    });
  },
  render: function render() {
    var props = this.props;
    return React.createElement('circle', {
      cx: props.cx,
      cy: props.cy,
      r: this.state.circleRadius,
      fill: this.state.circleColor,
      id: props.id,
      className: props.className
    });
  }
});