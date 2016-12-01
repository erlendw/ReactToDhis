import btoa from 'btoa'
import Axios from 'axios'
import async from 'async'
import superagent from 'superagent'

// Url for DHIS api. Variable "dhisAPI is defined in index.html"
const serverUrl = dhisAPI + '/api/organisationUnits.json?fields=openingDate,id,displayName,name,shortName,displayShortName,level,coordinates,parent[id,displayName,parent[id,displayName,parent[id,displayName]]],children[id,displayName,level,coordinates,children[displayName,coordinates,level,children[id,displayName,level,coordinates,parent[displayName,parent[displayName]]]]]&paging=false';

//const serverUrl = 'https://play.dhis2.org/test/api/organisationUnits.json?fields=openingDate,id,displayName,name,shortName,displayShortName,level,coordinates,parent[id,displayName,parent[id,displayName,parent[id,displayName]]],children[id,displayName,level,coordinates,children[displayName,coordinates,level,children[id,displayName,level,coordinates,parent[displayName,parent[displayName]]]]]&paging=false';

var Chiefdom = '';
var District = '';
// Authentication for DHIS2
const basicAuth = `Basic ${btoa('admin:district')}`;

// Options for requests to DHIS2 api
const fetchOptions = {
    method: 'GET',
    headers: {
        Authorization: basicAuth,
        'Content-Type': 'application/json'
    }
};

/*
Adding a bulk of units to props
*/
export const recievedOrganisations = (data) => {  
    return{
        type: "ORGANISATIONS_RECIEVED",
        payload: data
    }
};

/*
Adding one unit to props
*/
export const addOrganisation = (data) => {  
    return{
        type: "ADD_ORGANISATION",
        payload: data
    }
};

/*
Adds a unit to props for editing
*/
export const updateCurrentOrg = (org) => {
    return {
        type: 'CURRENTORG_UPDATED',
        payload : org
    }
};

/*
Set the search array in props
*/
export const updateSearch = (data) => {
    return{
        type: "UPDATE_SEARCH",
        payload: data
    }
};

/*
Add Chiefdom border arrays to props
*/
export const getChiefdomBorderSuccess = (cords) => {
    return {
        type: 'GET_CHIEFDOM_BORDER_SUCCESS',
        cords
    }
};

/*
Add District border arrays to props
*/
export const getDistrictBorderSuccess = (cords) => {
    return {
        type: 'GET_DISTRICT_BORDER_SUCCESS',
        cords
    }
};

/*
Show the help modal
*/
export const showHelpModal = (b) => { 
    return {
        type: 'SHOW_HELP_MODAL',
        payload : b
    }
};

/*
Show the "add new unit" modal
*/
export const showAddOrgModal = (b) => { 
    return {
        type: 'ADDORG_UPDATED',
        payload : b
    }
};

/*
Show the "change a unit" modal
*/
export const showChangeOrgModal = (b) => { 
    return {
        type: 'CHANGEORG_UPDATED',
        payload : b
    }
};

/*
Add a bulk of Chiefdom polygons to props
*/
export const updateChiefdomBorderPolygons = (polys) => {
    return{
        type: 'UPDATE_CHIEFDOM_BORDER_POLYGON',
        polys
    }
};

/*
Add a bulk of District polygons to props
*/
export const updateDistrictBorderPolygons = (polys) => {
    return{
        type: 'UPDATE_CHIEFDOM_BORDER_POLYGON',
        polys
    }
};

/*
Add a bulk of Chiefdom polygons to props
*/
export const showAllChildPolygons = (polys) => {
    return{
        type: 'SHOW_ALL_CHILD_POLYGONS',
        polys
    }
};

/*
Creates markers on the map for all the facilities that have coordinates
*/
export const createAllMarkers = (allFacilities, map) =>{

    var allMarkers = [];
    
    allFacilities.forEach(function addAMarker(item){
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
            position: item.coordinatesObject[0],
            icon: 'http://i.imgur.com/6SuUCSW.png',
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

        allMarkers.push(marker);
    });
    
    return {
        type: 'SET_ALL_MARKERS',
        allMarkers
    }

};

/*
Creates a marker for a facility, adds a 
info window to it and sends it to the store
*/
export const getLocationSuccess = (coordinates, map, item) => {

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
        icon: 'http://i.imgur.com/6SuUCSW.png',
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

/*
Creates a polygon on the map for a district. 
Also adds polygons and info windows for all 
chiefdoms in the district.
*/
export const addDistrictBorderPolygon = (cords, item, map, dispatch) => {

    // Create the polygon
    var districtBorder = new google.maps.Polygon({
        paths: cords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.25
    });

    /*
    When clicked the polygon should be removed and polygons
    for all the chiefdoms should replace it. The map should
    also zoom in to the clicked district.

    When the polygon is clicked the results list will show 
    chiefdoms in district
    */
    districtBorder.addListener('click', function(event) {

        // Remove district polygon
        districtBorder.fillOpacity = 0;
        districtBorder.setMap(null);

        // Zoom in to the district
        map.setZoom(9);
        map.setCenter(item.centerCoordinates);

        var newSearch = [];
        var allChildPolygons = [];

        // Create polygon and infowindow for each chiefdom in the district
        item.children.forEach(function eachChild(child){

            // Check for invalid data
            if(child != undefined ){
                if(child.coordinates != undefined){
                    
                    var j = JSON.parse(child.coordinates);
                    var array = [];

                    /*
                    Iterate the chiefdoms coordinates. A chiefdom might
                    contain several polygons. If the chiefdom contains
                    islands, coordinates for those will be will be grouped
                    in several arrays.
                    */
                    for(var i = 0; i < j.length; i+=1){

                        // Check for invalid data
                        if(j[i].length != undefined){   
                            if(j[0][0].length < 7 && j.length == 1){
                                //console.log(child.displayName);
                            }
                            else{
                                var bounds = new google.maps.LatLngBounds();
                                var temp = [];   


                                j[i].forEach((c) => {
                                    c.forEach((subC)=>{

                                        var ut = {                                                          
                                            lng: subC[0],
                                            lat: subC[1]
                                        } 
                                        bounds.extend(ut);
                                        temp.push(ut); 
                                    });

                                    // Content for info window
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
                                                              
                                    // Create the chiefdom
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

                                    // Create the info window
                                    var infowindow = new google.maps.InfoWindow({
                                        content: info,
                                        position: bounds.getCenter()
                                    });

                                    /* Add a click listener to the chiefdom polygon. 
                                    When clicked, the info window should show*/
                                    chiefdomBorder.addListener('click', function(event) {
                                        map.setZoom(10);
                                        map.setCenter(bounds.getCenter());
                                        infowindow.open(map);
                                    });
                                    array.push(temp);
                                    allChildPolygons.push(chiefdomBorder);                                                              
                                });
                            }
                        }
                    }
                    
                    // Check for invalid data     
                    if(child.parent == undefined)
                        child.parent = {displayName: "no parent", parent: {displayName: "no parent"}}

                    // Chiefdoms in the district will be added to the results list
                    child.coordinatesObject = array;
                    newSearch.push(child);
                }
            }
        });
        // Add all polygons to props
        dispatch(showAllChildPolygons(allChildPolygons));

        // Update the results list to show the chiefdoms in the district
        dispatch(updateSearch(newSearch));  
    });
    return {
        type: 'ADD_DISTRICT_BORDER_POLYGON',
        districtBorder
    }
};

/*
Creates a Chiefdom polygon
*/
export const createChildPolygon = (childCords, map, child) =>{

    var bounds = new google.maps.LatLngBounds();
    var temp = [];   
   
    childCords.forEach((c) => {
        c.forEach((subC)=>{

            var ut = {                                                          
                lng: subC[0],
                lat: subC[1]
            } 
            bounds.extend(ut);
            temp.push(ut); 
        });                           
    });

    // Content for info window
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
                              
    // Create the polygon
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

    // Create the info window
    var infowindow = new google.maps.InfoWindow({
        content: info,
        position: bounds.getCenter()
    });

    // Add a click listener to the polygon. When clicked, the info window should show
    chiefdomBorder.addListener('click', function(event) {
        map.setZoom(10);
        map.setCenter(bounds.getCenter());
        infowindow.open(map);
    });
    return {
        type: 'ADD_CHIEFDOM_BORDER_POLYGON',
        chiefdomBorder
    }
};

/*
Creates a chiefdom polygon and info window for the map
*/
export const addChiefdomBorderPolygon = (cords, item, map) => {

    // Content for the info window
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

    // Create the polygon
    var chiefdomBorder = new google.maps.Polygon({
        paths: cords,
        strokeColor: '#008822',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#008822',
        fillOpacity: 0.20
    });

    // Create the info window
    var infowindow = new google.maps.InfoWindow({
        content: info,
        position: item.centerCoordinates
    });

    // Add a click listener to the polygon. When clicked, the info window should show
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

/*
Function that finds search results for the live search
and updates the results list.
*/
export const findMatchingElements = (data, search) => {
    return(dispatch) => {
        
        var results = [];
        data.forEach( (elem) =>
        {
            if(elem.displayName.toLowerCase().indexOf(search.target.value.toLowerCase()) !== -1 ){
                results.push(elem)
            }
        });
        dispatch(updateSearch(results))        
    }
};

/*
Functions that filters the results list on levels
*/
export const changeLevel = (e , data, all) => {
    return(dispatch) => {

        var satan = [];
        console.log(e);
        if(e.target.value == 5){
            dispatch(updateSearch(all));
        }
        else{
            all.forEach( (elem) => {
                if(elem.level == e.target.value){
                    satan.push(elem)
                }
            });
            dispatch(updateSearch(satan))
        }
    }   
};

/*
Shows all the districts border polygons
*/
export const showDistrictBorder = (props, map, singles) => {
    return(dispatch) => {
        singles.forEach(function(poly){
            if(poly.type == "district"){
                poly.setMap(null);
            }
        });
        props.districtBorderPolygons.forEach(function(dbp){
            dbp.setMap(map);                
            dbp.fillOpacity = 0.2;     
        });
        props.chiefdomBorderPolygons.forEach(function(dbp){
            dbp.setMap(null);             
        });
        dispatch(updateDistrictBorderPolygons(props.districtBorderPolygons));
        dispatch(updateChiefdomBorderPolygons(props.chiefdomBorderPolygons));

    }   
};

/*
Shows all the chiefdoms border polygons
*/
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

/*
Removes all border polygons
*/
export const showNoBorder = (props, map, singles) => {

    return(dispatch) => {
        singles.forEach(function(poly){
            poly.setMap(null);
        });
        props.districtBorderPolygons.forEach(function(dbp){
            dbp.setMap(null);   
            dbp.fillOpacity = 0.2;  
         
        });
        props.chiefdomBorderPolygons.forEach(function(dbp){
            dbp.setMap(null);             
        });
        dispatch(updateDistrictBorderPolygons(props.districtBorderPolygons));
        dispatch(updateChiefdomBorderPolygons(props.chiefdomBorderPolygons));

    }   
};


/*
Adds a new unit to DHIS2
*/
export const addNewOganisationUnit = (addOrg) =>{

    var level = 4;
    var cords = {"lng":addOrg.state.longitude, "lat": addOrg.state.lattitude};
    var cordsString = "[ "+addOrg.state.longitude+", "+addOrg.state.lattitude+" ]";

    // The new unit
    var data = {
        "name":addOrg.state.name, 
        "shortName":addOrg.state.shortName,
        "displayName":addOrg.state.displayName, 
        "displayShortName":addOrg.state.displayShortName, 
        "coordinates":cordsString, 
        "openingDate":addOrg.state.date, 
        "level":level, 
        "displayName":addOrg.state.displayName,
        "parent":{"id":Chiefdom, "displayName":"Badjia", "parent":{"id":District, "displayName":"Bo", "parent":{"displayName": "Sierra Leone"}}}
    };

    console.log(data);

    console.log(addOrg.props.currentOrg.map);

    return (dispatch) => {

        // Send to DHIS2
        
        superagent.post(dhisAPI + '/api/organisationUnits')
            .send(data)
            .set('Authorization', basicAuth)
            .set('Accept', 'application/json')
            .end(function(err, response){

                // If DHIS2 responds with right code
                if(response.status == 201){

                    var info =  '<div id="content">'+
                        '<div id="siteNotice">'+
                        '</div>'+
                        '<h2 id="secondHeading" class="secondHeading">'+ addOrg.state.displayName+'</h2>'+
                        '<div id="bodyContent">'+
                        '<p><b>Chiefdom: </b>'+ Chiefdom +
                        '<p><b>District: </b>'+ District +
                        '</p>'+
                        '</div>'+
                        '</div>';

                    // Creates the marker
                    var marker = new google.maps.Marker({
                        position: cords,
                        label: addOrg.state.displayName,
                        map: addOrg.props.currentOrg.map
                    });

                    // Create an info window for the marker
                    var infowindow = new google.maps.InfoWindow({
                        content: info
                    });

                    // Add listener to marker so info window is displayed if marker is clicked
                    marker.addListener('click', function() {
                        infowindow.open(addOrg.props.currentOrg.map, marker);
                    });

                    data.coordinatesObject = cords;

                    // Refresh
                    //dispatch(fetchOrganisations(addOrg.props.currentOrg.map));

                }
            });
    }
};

/*
Edits a unit in DHIS2
*/
export const editOganisationUnit = (bigObj) =>{


    var currentOrg = bigObj.props.currentOrg;
    var formState = bigObj.state;

    for(var key in formState){

        if(formState.hasOwnProperty(key)){
            if(formState[key] != ""){
                currentOrg[key] = formState[key]
            }
        }

    }



    console.log(currentOrg);

    return (dispatch) => {
        superagent.put(dhisAPI + '/api/organisationUnits/' + currentOrg.id)
            .send(currentOrg)
            .set('Authorization', basicAuth)
            .set('Accept', 'application/json')
            .end(function(err, response){
                console.log(response);

            });
    }

};

/*
Gets all organisations from DHIS2 and stores them in props
*/
export const fetchOrganisations = (map) => {
    return (dispatch) => {
        return Axios.get(serverUrl, fetchOptions)
            .then(response => {

                // We only want to display the districts in the result list first
                var search = [];

                // Find all districts in the Sierra Leone database
                response.data.organisationUnits.forEach(function getSearch(org){
                    if(org.level != undefined  && org.parent != undefined)
                        if(org.level == 2 && org.parent.displayName == 'Sierra Leone')
                            search.push(org);
                });

                var allFacilities = [];
                var SierraLeone = [];

                // Iterate all units in response
                async.forEach(response.data.organisationUnits, function asyncforeach(organisation, callback) {

                    // Check for invalid data
                    if(organisation.coordinates != undefined && organisation.displayName != "mmm"){
                      
                        var j = JSON.parse(organisation.coordinates);
                        var array = [];
                        var bounds = new google.maps.LatLngBounds();

                        // If the units coordinates is a point
                        if(j[0][0] == undefined){
                         
                            var ut = {                                                        
                                lng: j[0],
                                lat: j[1]
                            } 

                            array.push(ut);

                            // Create an additional field in the unit for use in the map
                            organisation.coordinatesObject = array;

                            if(organisation.level == 4){
                                if(organisation.parent.parent.parent != undefined){
                                    if(organisation.parent.parent.parent.displayName == 'Sierra Leone'){
                                        // Add as a facility
                                        allFacilities.push(organisation);

                                    }
                                }                              
                            }                      
                        }
                        else{
                            
                            var ut={};

                            // For special cases
                            if(typeof j[0] == "string" && j.length == 2){    
                                                   
                                ut = {
                                    lng: Number(j[0]),
                                    lat: Number(j[1])
                                };
                                array.push(ut);  
                                                          
                            }
                            // Units coordinates are a group of coordinates
                            else{                                             
                                for(var i = 0; i < j.length; i+=1){
                                    var temp = [];
                                    j[i].forEach((c) => {
                                        c.forEach((subC)=>{
                                            ut = {                                                          
                                                lng: subC[0],
                                                lat: subC[1]
                                            };
                                            bounds.extend(ut);
                                            temp.push(ut); 
                                        });
                                                                      
                                    });
                                    array.push(temp);
                                }                               
                            }

                            // If Chiefdom, create all border coordinates
                            if(organisation.level == 3){  
                                array.forEach((section) =>{
                                    if(section.length > 6){
                                        if(organisation.parent.parent != undefined){
                                            if(organisation.parent.parent.displayName == 'Sierra Leone'){
                                                organisation.centerCoordinates = bounds.getCenter();
                                                dispatch(addChiefdomBorderPolygon(section, organisation, map));
                                            }
                                        }                                       
                                    }
                                });                                           
                            }
                            // If District, create all border coordinates
                            else if(organisation.level == 2){
                                array.forEach(function eachDistrict(section){
                                    if(organisation.parent != undefined){
                                        if(organisation.parent.displayName == 'Sierra Leone'){
                                            dispatch(addDistrictBorderPolygon(section, organisation, map, dispatch));
                                        }
                                    }
                                });                               
                            }
                            // Add additional fields to unit.                           
                            organisation.coordinatesObject = array;
                            organisation.centerCoordinates = bounds.getCenter();
                        }
                    }

                    // Keep the unit if its part of the Sierra Leone Database
                    if(organisation.level == 2 && organisation.parent != undefined){
                        if(organisation.parent.displayName == 'Sierra Leone'){
                            SierraLeone.push(organisation);
                            District = organisation.id;
                        }                      
                    }
                    else if(organisation.level == 3 && organisation.parent.parent != undefined){
                        if(organisation.parent.parent.displayName == 'Sierra Leone' && organisation.parent.displayName != 'World'){                           
                            SierraLeone.push(organisation);
                            Chiefdom = organisation.id;
                        }
                    }
                    else if(organisation.level == 4 && organisation.parent.parent.parent != undefined){
                        if(organisation.parent.parent.parent.displayName == 'Sierra Leone'){
                            SierraLeone.push(organisation);
                        }
                    }
                });

                // Store all Units to props           
                dispatch(recievedOrganisations(SierraLeone));

                // Create all the markers for the map
                dispatch(createAllMarkers(allFacilities, map));

                // Set the array for the results list
                dispatch(updateSearch(search));
                
            })
            .catch(error => {
                throw(error);
            });
    }
};