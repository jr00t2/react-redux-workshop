import * as ActionTypes from './types';
import axios from 'axios';

export function getEntries() {
    let payload = axios.get('http://bouncer.jblxd02.apprunner.info/');
    return {
        type: ActionTypes.GET_ENTRIES,
        payload: payload,
    }    
}

export function setCancelledState(payload) {
    return {
        type: ActionTypes.SET_CANCELLED_STATE,
        payload: payload,
    }
}