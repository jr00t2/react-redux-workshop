import React from 'react';
import PropTypes from 'prop-types';


export default class EntriesTable extends React.PureComponent {
    static propTypes = {
        entries: PropTypes.array.isRequired,
    };

    renderItem = (item) => {
        return(
            <li key={JSON.stringify(item)}>
                { item.summary }
            </li>
        );
    }

    render() {
        const { entries } = this.props;
        if (entries.length === 0) return null;

        return (
            <ul>
                {entries.map(item => this.renderItem(item))}
            </ul>
        );
    }

}
