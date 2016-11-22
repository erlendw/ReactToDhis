/**
 * Created by erlend on 09.11.2016.
 */

import {combineReducers} from 'redux'
import organisations from './organisation';
import search from './search';
import markers from './marker';
import ui from './ui';

const mainReducer = combineReducers({

    organisations,
    search,
    markers,
    ui

});

export default mainReducer;