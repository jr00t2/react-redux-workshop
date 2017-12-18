import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/*
PSEUDO CODE // ANWEISUNGEN ÜBERLEGUNGEN
Zeitfenster Komponente (Wie viele Stunden ist der Raum frei bis zum nächsten Meeting / bis zum Ende des Tages)
(kann immer angezeigt werden auch wenn der Raum gerade besetzt ist)

variables
now = current time
firstEventInList
nextEvent
x

if (now < firstEventInList) —> x = time between now and firstEventInList
if (now between firstEventInList Start and End) —> x = time between firstEventInList End and nextEvent
if (!nextEvent) —> ‘frei bis ende des Tages’)
else —> ‘ab {firstEventInList || now} frei für {x} Stunden bis {nextEvent}’


--> we have isOccupied, item, entries -->

filteredEntries = entries.filter(item => item !== occupied.item

--> perhaps:

let freeTimeSlot = 0;
let message = '';

if (isOccupied && filteredEntries.length > 0) {
    freeTimeSlot = filteredEntries[0].timeStart - item.timeEnd;
    message = 'Nach dem Ende des aktuellen Termins ist dieser Raum für die nächsten ${freeTimeSlot} Stunden frei.';
} else if (!isOccupied && entries.length > 0) {
    freeTimeSlot = entries[0].timeStart - moment();
    message = 'Dieser Raum für die nächsten ${freeTimeSlot} Stunden frei.';
} else if (isOccupied && filteredEntries.length === 0) {
   message = 'Nach dem Ende des aktuellen Termins ist dieser Raum bis auf Weiteres frei.';
} else if (!isOccupied && entries.length === 0) {
   message = 'Dieser Raum ist bis auf Weiteres frei.';
} else {
   message = 'FEHLER!';
}






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