/**
 * Created by erlend on 09.11.2016.
 */

import {combineReducers} from 'redux'
import organisations from './organisation';
import search from './search';
import markers from './marker';
import addOrg from './addOrg';
import changeOrg from './changeOrg';
import chiefdomBorder from './chiefdomBorder';
import districtBorder from './districtBorder';
import districtBorderPolygon from './districtBorderPolygon'
import chiefdomBorderPolygon from './chiefdomBorderPolygon'



const mainReducer = combineReducers({

    organisations,
    search,
    markers,
    addOrg,
    changeOrg,
    chiefdomBorder,
    districtBorder,
    chiefdomBorderPolygon,
    districtBorderPolygon

});

export default mainReducer;