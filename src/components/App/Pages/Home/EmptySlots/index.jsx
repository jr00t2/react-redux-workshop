import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/*
ANWEISUNGEN
Zeitfenster Komponente (Wie viele Stunden ist der Raum frei bis zum nächsten Meeting / bis zum Ende des Tages)
(kann immer angezeigt werden auch wenn der Raum gerade besetzt ist)
*/

export default class EmptySlots extends React.PureComponent {
    static propTypes = {
        entriesFiltered: PropTypes.array.isRequired,
    };

    getFreeSlot = (endTimeOfFreeSlot, startTimeOfFreeSlot) => (
            moment(endTimeOfFreeSlot, 'HH:mm').diff(moment(startTimeOfFreeSlot, 'HH:mm'), 'hours','minutes')
        );

    getMessage = () => {
        const { occupied, entriesFiltered } = this.props;

        let message = 'FEHLER';

        if (occupied.isOccupied && entriesFiltered.length > 0) {
            message = `Nach dem Ende des aktuellen Termins ist dieser Raum für die nächsten ${this.getFreeSlot(entriesFiltered[0].timeStart, occupied.item.timeEnd)} Stunden frei.`;
        } else if (!occupied.isOccupied && entriesFiltered.length > 0) {
            message = `Dieser Raum für die nächsten ${this.getFreeSlot(entriesFiltered[0].timeStart,moment())} Stunden frei.`;
        } else if (occupied.isOccupied && entriesFiltered.length === 0) {
            message = 'Nach dem Ende des aktuellen Termins ist dieser Raum bis auf Weiteres frei.';
        } else if (!occupied.isOccupied && entriesFiltered.length === 0) {
            message = 'Dieser Raum ist bis auf Weiteres frei.';
        }

        return message;
    };


    render() {
        return (<p className='message'>{this.getMessage()}</p>);
    };
}