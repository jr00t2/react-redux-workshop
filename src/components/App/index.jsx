import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as calendarActions from 'actions/calendar';

@connect(
  ({ calendar }) => ({
    calendar,
  }), {
    ...calendarActions,
  },
)
export default class App extends React.PureComponent {
  static propTypes = {
    test: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div>
        <h3>React redux Workshop</h3>
        <button
          onClick={() => this.props.test()}
          className="btn btn-primary">
          Test
        </button>
      </div>
    );
  }
}
