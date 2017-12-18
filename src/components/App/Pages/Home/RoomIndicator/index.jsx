import React from 'react';
import PropTypes from 'prop-types';
import CancelEvent from "../CancelEvent/index";

export default class RoomIndicator extends React.PureComponent {
  static propTypes = {
    isOccupied: PropTypes.bool,
    item: PropTypes.object,
    setCancelledState: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isOccupied: false,
    item: {},
  };

  render() {
    const { isOccupied, item } = this.props;
    return (
      <div className="row">
        <CancelEvent onclick={() => {this.props.setCancelledState({item, room: 'red'})}}/>
        <div className="col-md-12">
          {isOccupied && !item.isCancelled ?
            <i className="fa fa-close"></i> :
            <i className="fa fa-check"></i>
          }
        </div>
        <div className="col-md-12">
          <h3 className={item.isCancelled ? 'cancelled' : ''}>{item.summary}</h3>
          <p className={item.isCancelled ? 'cancelled' : ''}>{item.timeStart} - {item.timeEnd}</p>
          <p className={item.isCancelled ? 'cancelled' : ''}>{item.organizerName}</p>
        </div>
      </div>
    );
  }

}
