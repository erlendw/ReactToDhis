/**
 * Created by erlend on 09.11.2016.
 */

import btoa from 'btoa'
import Axios from 'axios'
import async from 'async'

// https://play.dhis2.org/demo/api/organisationUnits.json?filter=id:eq:vWbkYPRmKyS&fields=id,displayName,level,coordinates,children&paging=false&level=3
const serverUrl = 'https://play.dhis2.org/test/api/organisationUnits.json?fields=id,displayName,level,coordinates,parent[displayName,parent[displayName]],children[displayName,coordinates,level,children[displayName]]&paging=false';
//const shortServerUrl = 'https://play.dhis2.org/test/api/organisationUnits';
//const serverUrl = 'https://play.dhis2.org/test/api/organisationUnits.json?filter=id:eq:vWbkYPRmKyS&fields=coordinates,displayName';

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

export const getLocationSuccess = (coordinates, map, item) => {

    /*
    This function creates a marker for a facility, adds a 
    info window to it and sends it to the store
    */

    // Taking into account that some organisational units 
    // have invalid parent data
    var district = " ";
    var chiefdom = " ";

    if(item.parent != undefined)
        chiefdom = item.parent.displayName;
        if(item.parent.parent != undefined)
            district = item.parent.parent.displayName
    
    // Text for info window
    var info =  '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h2 id="secondHeading" class="secondHeading">'+ item.displayName+'</h2>'+
                    '<div id="bodyContent">'+
                    '<p><b>Chiefdom: </b>'+ chiefdom + 
                    '<p><b>District: </b>'+ district + 
                    '</p>'+
                    '</div>'+
                '</div>';

    // Create the marker
    var marker = new google.maps.Marker({
        position: coordinates,
        icon: 'containers/marker.png',
        map: map
    });

    // Create an info window for the marker
    var infowindow = new google.maps.InfoWindow({
        content: info
    });

    // Add listener to marker so info window is displayed if marker is clicked
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    return {
        type: 'GET_LOCATION_SUCCESS',
        marker
    }
};

export const getChiefdomBorderSuccess = (cords) => {
  return {
    type: 'GET_CHIEFDOM_BORDER_SUCCESS',
    cords
  }
};

export const getDistrictBorderSuccess = (cords) => {
  return {
    type: 'GET_DISTRICT_BORDER_SUCCESS',
    cords
  }
};



export const showAddOrgModal = (b) => { //b === boolean
    console.log(b);
    return {
        type: 'ADDORG_UPDATED',
        payload : b
    }
};

export const addDistrictBorderPolygon = (cords, item, map, dispatch) => {
    var districtBorder = new google.maps.Polygon({
        paths: cords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.25
    });

    districtBorder.addListener('click', function(event) {
        
        districtBorder.fillOpacity = 0;
        map.setZoom(9);
        map.setCenter(item.centerCoordinates);
        item.children.forEach((child) => {
            var j = JSON.parse(child.coordinates);
           // console.log(j);
           
            for(var i = 0; i < j.length; i+=1){
                dispatch(createChildPolygon(j[i],map, child));
            }               
            
        });
        
    });
    return {
        type: 'ADD_DISTRICT_BORDER_POLYGON',
        districtBorder
    }
};


export const createChildPolygon = (childCords, map, child) =>{


    var bounds = new google.maps.LatLngBounds();
    var temp = [];

    childCords.forEach((c) => {
        c.forEach((subC)=>{
        
           // console.log(c);
            var ut = {                                                          
                lng: subC[0],
                lat: subC[1]
            } 
            bounds.extend(ut);
            temp.push(ut); 
        });
                                      
    });

    var info =  '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h2 id="secondHeading" class="secondHeading">'+ child.displayName+'</h2>'+
                    '<div id="bodyContent">'+
                    '<p><b>Facilities in this Chiefdom: </b></p>'+
                    '<p>';

    child.children.forEach((child) => {
        info += child.displayName + '<br/>'
    });

    info += '</p>'+'</div>'+'</div>';
                              

    var chiefdomBorder = new google.maps.Polygon({
        paths: temp,
        strokeColor: '#008822',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#008822',
        fillOpacity: 0.2,
        map: map,
        type: "chiefdomAddOn"
    });

    var infowindow = new google.maps.InfoWindow({
        content: info,
        position: bounds.getCenter()
    });

    chiefdomBorder.addListener('click', function(event) {
        map.setZoom(10);
        map.setCenter(bounds.getCenter());
        infowindow.open(map);
    });
    return {
        type: 'ADD_CHIEFDOM_BORDER_POLYGON',
        chiefdomBorder
    }
}

export const addChiefdomBorderPolygon = (cords, item, map) => {

    var info =  '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h2 id="secondHeading" class="secondHeading">'+ item.displayName+'</h2>'+
                    '<div id="bodyContent">'+
                    '<p><b>Facilities in this Chiefdom: </b></p>'+
                    '<p>';

    item.children.forEach((child) => {
        info += child.displayName + '<br/>'
    });

    info += '</p>'+'</div>'+'</div>';

    var chiefdomBorder = new google.maps.Polygon({
        paths: cords,
        strokeColor: '#008822',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#008822',
        fillOpacity: 0.20
    });

    var infowindow = new google.maps.InfoWindow({
        content: info,
        position: item.centerCoordinates
    });

    chiefdomBorder.addListener('click', function(event) {
        map.setZoom(10);
        map.setCenter(item.centerCoordinates);
        infowindow.open(map);
    });

    return {
        type: 'ADD_CHIEFDOM_BORDER_POLYGON',
        chiefdomBorder
    }
};

export const updateChiefdomBorderPolygons = (polys) => {
    return{
        type: 'UPDATE_CHIEFDOM_BORDER_POLYGON',
        polys
    }
}

export const updateDistrictBorderPolygons = (polys) => {
    return{
        type: 'UPDATE_CHIEFDOM_BORDER_POLYGON',
        polys
    }
}



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


export const showDistrictBorder = (props, map, singles) => {
    return(dispatch) => {
        singles.forEach(function(poly){
            if(poly.type == "district")
                poly.setMap(null);
        });

        props.districtBorderPolygons.forEach(function(dbp){
            dbp.setMap(map);             
        });
        props.chiefdomBorderPolygons.forEach(function(dbp){
            dbp.setMap(null);             
        });
        dispatch(updateDistrictBorderPolygons(props.districtBorderPolygons));
        dispatch(updateChiefdomBorderPolygons(props.chiefdomBorderPolygons));

    }   
};

export const showChiefdomBorder = (props, map, singles) => {

    return(dispatch) => {
        singles.forEach(function(poly){
            poly.setMap(null);
        });
        props.districtBorderPolygons.forEach(function(dbp){
            dbp.setMap(null);             
        });
        props.chiefdomBorderPolygons.forEach(function(dbp){
            if(dbp.type != "chiefdomAddOn")
                dbp.setMap(map);             
        });
        dispatch(updateDistrictBorderPolygons(props.districtBorderPolygons));
        dispatch(updateChiefdomBorderPolygons(props.chiefdomBorderPolygons));

    }   
};

export const showNoBorder = (props, map, singles) => {

    return(dispatch) => {
        singles.forEach(function(poly){
            poly.setMap(null);
        });
        props.districtBorderPolygons.forEach(function(dbp){
            dbp.setMap(null);             
        });
        props.chiefdomBorderPolygons.forEach(function(dbp){
            dbp.setMap(null);             
        });
        dispatch(updateDistrictBorderPolygons(props.districtBorderPolygons));
        dispatch(updateChiefdomBorderPolygons(props.chiefdomBorderPolygons));

    }   
};
/*
export const addNewOganisationUnit = (name, shortName, date) =>{
    return (dispatch) => {
        return Axios.post(shortServerUrl, fetchOptions2)
            .then(response => {
                async.forEach(response.data.organisationUnits, function (organisation, callback) {
            
                    if(organisation.coordinates != undefined){
                        
                        var j = JSON.parse(organisation.coordinates);
                        var array = [];
                    
                        if(j[0][0] == undefined){

                            var ut = {                                                        
                                lng: j[0],
                                lat: j[1]
                            } 

                            array.push(ut);
                            organisation.coordinatesObject = array;

                            if(organisation.level == 4)
                                dispatch(getLocationSuccess(ut, map, organisation));                      
                        }
                        else{
                            var ut={};
                            if(typeof j[0] == "string" && j.length == 2){                           
                                ut = {
                                    lng: Number(j[0]),
                                    lat: Number(j[1])
                                }
                                array.push(ut);  
                                                          
                            }
                            else{
                                j[0][0].forEach((c) => {                                           
                                    ut = {                                                          
                                        lng: c[0],
                                        lat: c[1]
                                    } 
                                    array.push(ut);                               
                                });
                            }     
                            if(organisation.level == 3){
                        
                                if(array.length > 6){
                                    dispatch(getChiefdomBorderSuccess(array)); 
                                    dispatch(addChiefdomBorderPolygon(array));            
                                }
                                else{
                                    //console.log(organisation.displayName + " does not have proper coordinates");
                                }
                                
                            }
                            else if(organisation.level == 2){
                                dispatch(getDistrictBorderSuccess(array)); 
                                dispatch(addDistrictBorderPolygon(array));
                            }
                           
                            organisation.coordinatesObject = array;
                        }
                    }
                });
                dispatch(recievedOrganisations(response.data.organisationUnits));
                dispatch(updateSearch(response.data.organisationUnits));
            })
            .catch(error => {
                throw(error);
            });
    }
};
*/
export const fetchOrganisations = (map) => {
   
    return (dispatch) => {

        return Axios.get(serverUrl, fetchOptions)
            .then(response => {
                async.forEach(response.data.organisationUnits, function (organisation, callback) {
            
                    if(organisation.coordinates != undefined && organisation.displayName != "mmm"){
                      
                        var j = JSON.parse(organisation.coordinates);
                        var array = [];
                        var bounds = new google.maps.LatLngBounds();
                  
                        if(j[0][0] == undefined){
                         
                            var ut = {                                                        
                                lng: j[0],
                                lat: j[1]
                            } 

                            array.push(ut);
                            organisation.coordinatesObject = array;

                            if(organisation.level == 4)
                                dispatch(getLocationSuccess(ut, map, organisation));                      
                        }
                        else{
                            i
                            var ut={};
                            if(typeof j[0] == "string" && j.length == 2){    
                                                   
                                ut = {
                                    lng: Number(j[0]),
                                    lat: Number(j[1])
                                }
                                array.push(ut);  
                                                          
                            }
                            else{                                             
                                for(var i = 0; i < j.length; i+=1){
                                    var temp = [];
                                    //console.log(j[i]);
                                    j[i].forEach((c) => {
                                        c.forEach((subC)=>{
                                           // console.log(c);
                                            ut = {                                                          
                                                lng: subC[0],
                                                lat: subC[1]
                                            } 
                                            bounds.extend(ut);
                                            temp.push(ut); 
                                        });
                                                                      
                                    });
                                    array.push(temp);
                                }                               
                            }
                            if(organisation.level == 3){  
                                array.forEach((section) =>{
                                    if(section.length > 6){
                                        dispatch(getChiefdomBorderSuccess(section)); 
                                        organisation.centerCoordinates = bounds.getCenter();
                                        dispatch(addChiefdomBorderPolygon(section, organisation, map));
                                    }
                                });                                           
                            }
                            else if(organisation.level == 2){
                                array.forEach((section) =>{
                                    dispatch(getDistrictBorderSuccess(section)); 
                                    dispatch(addDistrictBorderPolygon(section, organisation, map, dispatch));
                                });                               
                            }                           
                            organisation.coordinatesObject = array;
                            organisation.centerCoordinates = bounds.getCenter();
                        }
                    }
                });

                dispatch(recievedOrganisations(response.data.organisationUnits));
                dispatch(updateSearch(response.data.organisationUnits));
                
            })
            .catch(error => {
                throw(error);
            });
    }
};

