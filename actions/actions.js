/**
 * Created by erlend on 09.11.2016.
 */

import btoa from 'btoa'
import Axios from 'axios'
import async from 'async'

// https://play.dhis2.org/demo/api/organisationUnits.json?filter=id:eq:vWbkYPRmKyS&fields=id,displayName,level,coordinates,children&paging=false&level=3
const serverUrl = 'https://play.dhis2.org/test/api/organisationUnits.json?fields=id,displayName,level,coordinates,parent[displayName,parent[displayName]]&paging=false';
//const serverUrl = 'https://play.dhis2.org/test/api/organisationUnits.json?filter=id:eq:vWbkYPRmKyS&fields=coordinates,displayName';
const mapzenSearchUrl1 = 'https://search.mapzen.com/v1/search?text='
const mapzenSearchUrl2  = '&api_key=mapzen-ifZwZZ9'
const basicAuth = `Basic ${btoa('admin:district')}`;


const fetchOptions = {
    method: 'GET',
    headers: {
        Authorization: basicAuth,
        'Content-Type': 'application/json'
    }
};

export const recievedOrganisations = (data) => {  
    return{
        type: "ORGANISATIONS_RECIEVED",
        payload: data
    }
};

export const updateSearch = (data) => {
    return{
        type: "UPDATE_SEARCH",
        payload: data
    }
};

export const getLocationSuccess = (markers) => {
  return {
    type: 'GET_LOCATION_SUCCESS',
    markers
  }
};

export const showAddOrgModal = (b) => { //b === boolean
    console.log(b);
    return {
        type: 'ADDORG_UPDATED',
        payload : b
    }
};


//ADDORG_UPDATED


export const findMatchingElements = (data, search) => {
    return(dispatch) => {
        var satan = [];
        data.forEach( (elem) =>
        {
            if(elem.displayName.toLowerCase().indexOf(search.target.value.toLowerCase()) !== -1 ){
                satan.push(elem)
            }
        });
        dispatch(updateSearch(satan))
    }
};

export const changeLevel = (e , data, all) => {
    return(dispatch) => {
        var satan = [];
        if(e.target.value == 5){
            dispatch(updateSearch(all));
        }
        else{
            data.forEach( (elem) => {
                if(elem.level == e.target.value){
                    satan.push(elem)
                }
            });
            dispatch(updateSearch(satan))
        }
    }   
};

export const fetchOrganisations = () => {

    return (dispatch) => {

        return Axios.get(serverUrl, fetchOptions)
            .then(response => {
                console.log(response.data.organisationUnits);

                async.forEach(response.data.organisationUnits, function (organisation, callback) {
            
                    if(organisation.coordinates != undefined){
                        
                        var j = JSON.parse(organisation.coordinates);

                        var array = [];
        
                        if(j[0][0] == undefined){

                            var ut = {                                                          // Create an object with the coordinates 
                                    lng: j[0],
                                    lat: j[1]
                                } 
                            array.push(ut);
                            organisation.coordinatesObject = array;
                            dispatch(getLocationSuccess(ut)); 
                      
                        }
                        else{
                            j[0][0].forEach((c) => {       
                                           
                                var ut = {                                                          // Create an object with the coordinates 
                                    lng: c[0],
                                    lat: c[1]
                                } 
                                array.push(ut);
                                
                            });
                             organisation.coordinatesObject = array;
                        }
                    }
                });




                dispatch(recievedOrganisations(response.data.organisationUnits));
                dispatch(updateSearch(response.data.organisationUnits));
              
                console.log("UTA");

                
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const getLocation = (name, organisation) => {
    return (dispatch) => {
        var url = mapzenSearchUrl1 + name + mapzenSearchUrl2;  
        console.log(organisation.coordinatesObject);
        organisation.coordinatesObject.forEach(co => {
            dispatch(getLocationSuccess(co));                
        });
                    
        return Axios.get(url)                                                               // Do the request
            .then(response => {
                for(var i = 0; i < response.data.features.length; i++){                     // Iterate the different locations mapzen found
                    if(response.data.features[i].properties.country == "Sierra Leone"){     // The first one that is in Sierra Leone is probably the right one
                        var ut = {                                                          // Create an object with the coordinates 
                            lng: response.data.features[i].geometry.coordinates[0],
                            lat: response.data.features[i].geometry.coordinates[1]
                        } 
                    dispatch(getLocationSuccess(ut));                                       // Send coordinates to be added to markers array
                    return;
                    }
                }                                                                            
                console.log('Sorry, but we were unable to find the location for this organisation unit');  //could not find location. should display some error message
            })
            .catch(error => {
            throw(error);
            });
        };
};  