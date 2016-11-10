/**
 * Created by erlend on 09.11.2016.
 */

import {combineReducers} from 'redux'
import OrganisationReducer from './organisation';
import SearchReducer from './search';


const mainReducer = combineReducers({

    organisations : OrganisationReducer,
    search : SearchReducer

});

export default mainReducer;