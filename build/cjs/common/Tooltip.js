'use strict';

var PropTypes = require('prop-types');
var React = require('react');
var createReactClass = require('create-react-class');

module.exports = createReactClass({
  displayName: 'exports',


  propTypes: {
    x: PropTypes.number,
    y: PropTypes.number,
    child: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
    show: PropTypes.bool
  },

  render: function render() {
    var props = this.props;
    var display = this.props.show ? 'inherit' : 'none';
    var containerStyles = {
      position: 'fixed',
      top: props.y,
      left: props.x,
      display: display,
      opacity: 0.8
    };

    // TODO: add 'right: 0px' style when tooltip is off the chart
    var tooltipStyles = {
      position: 'absolute',
      backgroundColor: 'white',
      border: '1px solid',
      borderColor: '#ddd',
      borderRadius: '2px',
      padding: '10px',
      marginLeft: '10px',
      marginRight: '10px',
      marginTop: '-15px'
    };
    return React.createElement(
      'div',
      { style: containerStyles },
      React.createElement(
        'div',
        { style: tooltipStyles },
        props.child
      )
    );
  }
});