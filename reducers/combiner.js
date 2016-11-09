/**
 * Created by erlend on 09.11.2016.
 */

import {combineReducers} from 'redux'
import OrganisationReducer from './organisation';


const mainReducer = combineReducers({

    organisations : OrganisationReducer

});

export default mainReducer;