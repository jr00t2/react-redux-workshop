import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Page from 'components/App/Pages';
import * as calendarActions from 'actions/calendar';
import RoomIndicator from './RoomIndicator/index';
import EntriesTable from "./EntriesTable/index";
import EmptySlots from "./EmptySlots/index";

@connect(
  ({ calendar }) => ({
    calendar,
  }), {
    ...calendarActions,
  },
)
export default class Home extends React.PureComponent {
  static propTypes = {
    calendar: PropTypes.object.isRequired,
    getEntries: PropTypes.func.isRequired,
      setCancelledState: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.interval = null;
  }

  componentWillMount() {
    this.props.getEntries();
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.getEntries();
    }, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  occupied = items => {
    let occupied = { item: {}, isOccupied: false };
    items.forEach(item => {
      if (occupied.isOccupied) return true;
      const now = moment();
      if (now.isBetween(moment(item.timeStart, 'HH:mm'), moment(item.timeEnd, 'HH:mm'))) {
        occupied = { item, isOccupied: true };
      }
    });
    return occupied;
  }

  render() {
    const isSet = Object.keys(this.props.calendar).length > 0;
    const { calendar: { rooms: { red: { entries } } } } = this.props;
    const occupied = this.occupied(entries);
    return (
      <Page>
        <h3>React Redux Workshop</h3>
        <RoomIndicator isOccupied={occupied.isOccupied} item={occupied.item} setCancelledState={this.props.setCancelledState} />
        <EmptySlots occupied={occupied} entriesFiltered={entries.filter(item => item !== occupied.item)} />
        <EntriesTable entries={entries.filter(item => item !== occupied.item)} />
      </Page>
    );
  }
}
