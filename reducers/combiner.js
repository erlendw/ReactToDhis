/**
 * Created by erlend on 09.11.2016.
 */

import {combineReducers} from 'redux'
import organisations from './organisation';
import search from './search';
import markers from './marker';

const mainReducer = combineReducers({

    organisations,
    search,
    markers 

});

export default mainReducer;