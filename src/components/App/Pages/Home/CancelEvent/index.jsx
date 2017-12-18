import React from 'react';
import PropTypes from 'prop-types';

export default class CancelEvent extends React.PureComponent {

    render() {
        return (
            <button onClick={this.props.onclick}>CANCEL THIS EVENT</button>
        );
    };
}