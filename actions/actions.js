/**
 * Created by erlend on 09.11.2016.
 */

import btoa from 'btoa'
import Axios from 'axios'


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


const serverUrl = 'https://play.dhis2.org/test/api/organisationUnits.json?paging=false';
const apiUrl = 'http://58233197a2c5d71200cd1f4b.mockapi.io/book';
const basicAuth = `Basic ${btoa('admin:district')}`;
const fetchOptions = {
    method: 'GET',
    headers: {
        Authorization: basicAuth,
        'Content-Type': 'application/json'
    }
};

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

export const fetchOrganisations = () => {

    return (dispatch) => {

        return Axios.get(serverUrl, fetchOptions)
            .then(response => {
                dispatch(recievedOrganisations(response.data.organisationUnits));
                dispatch(updateSearch(response.data.organisationUnits));
                console.log(response.data.organisationUnits)
            })
            .catch(error => {
                throw(error);
            });
    }

};  