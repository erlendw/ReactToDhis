<Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Displayname</th>
                        <th>Find on Map</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.search.map(function (organisations,i) {
                        return <tr key={organisations.id}><td>{organisations.id}</td><td>{organisations.displayName}</td><td><Button>Show on Map</Button></td></tr>
                    })}
                   
                    
                    </tbody>
                   
                </Table>


const mainReducer = combineReducers({

    organisations : OrganisationReducer,
    search : SearchReducer,
    markers: MarkerReducer 

});

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        recievedOrganisations: recievedOrganisations,
        fetchOrganisations : fetchOrganisations, 
        findMatchingElements : findMatchingElements,
        getLocation: getLocation(name)

    },dispatch)
}

 {this.props.markers.map((m,i) => <Marker key={i} lat={m.lat} lng={m.lng}/>)}

       <option value="1" onClick={() => {this.changeLevels(1, this.props.organisations)}}>1</option>
                  <option value="2" onClick={() => {this.changeLevels({2}, this.props.organisations)}}>2</option>
                  <option value="3" onClick={() => {this.changeLevels({3}, this.props.organisations)}}>3</option>
                  <option value="4" onClick={() => {this.changeLevels({4}, this.props.organisations)}}>4</option>
                </select>

<Polygon
                        paths={test}
                        strokeColor={color}/>

<Table striped bordered condensed hover id="result-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Displayname</th>
                    <th>Show on Map</th>
                </tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
        </Table>  


response.data.organisationUnits.forEach((co) =>{
                    var j = JSON.parse(co.coordinates);
                    var googleArray = []
                    j[0][0].forEach((c) => {
                      
                        var ut = {                                                          // Create an object with the coordinates 
                            lng: c[0],
                            lat: c[1]
                        } 
                        googleArray.push(ut);
                        dispatch(getLocationSuccess(ut)); 
                    });
                   
                   
                });


div id="map">
                    <Gmaps
                        width={w}
                        height={h}
                        lat={coords.lat}
                        lng={coords.lng}
                        zoom={8}
                        loadingMessage={'¨Reacting to DHIS'}
                        params={{v: '3.exp', key: 'AIzaSyDtsokboJ-exluz1PyeU6YrsEAoQSRvaDo'}}
                        onMapCreated={this.onMapCreated}>
                        onClick={this.click}
                        {this.props.markers.map((m,i) => <Marker key={i} lat={m.lat} lng={m.lng} icon={markerImg}/>)}

                        <InfoWindow
                            lat={coords.lat}
                            lng={coords.lng}
                            content={'hello'}
                            onCloseClick={this.onCloseClick} />
                        <Circle
                            lat={coords.lat}
                            lng={coords.lng}
                            radius={500}
                            onClick={this.onClick} />
                        
                    </Gmaps>  
                </div>


<script>

      // This example creates a simple polygon representing the Bermuda Triangle.

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: {lat: 24.886, lng: -70.268},
          mapTypeId: 'terrain'
        });

        // Define the LatLng coordinates for the polygon's path.
        var triangleCoords = [
          {lat: 25.774, lng: -80.190},
          {lat: 18.466, lng: -66.118},
          {lat: 32.321, lng: -64.757},
          {lat: 25.774, lng: -80.190}
        ];

        // Construct the polygon.
        var bermudaTriangle = new google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
        bermudaTriangle.setMap(map);
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtsokboJ-exluz1PyeU6YrsEAoQSRvaDo&callback=initMap">
    </script>

 <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtsokboJ-exluz1PyeU6YrsEAoQSRvaDo&callback=initMap">
    </script>



    typeof j[0] == "string" && j.length == 2

<ButtonGroup>
                                <Button onClick={() => {this.props.noBorders()}}>None</Button>
                                <Button onClick={() => {this.props.showDistrictBorders(this.props, map)}>Districts</Button>
                                <Button onClick={() => {this.showCheifdomBorders(this.props, map)}>Chiefdoms</Button>
                            </ButtonGroup>

                            onClick={() => {this.showCheifdomBorders(this.props, map)}

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
<ControlLabel>Name</ControlLabel>
                        <FormControl
                            type="text"
                          
                            placeholder="Enter text"
                            
                        />
                        <ControlLabel>Short Name</ControlLabel>
                        <FormControl
                            type="text"
                          
                            placeholder="Enter text"
                           
                        />
                        <ControlLabel>Opening Date</ControlLabel>
                        <input type="date" />

<img src="containers/spinner.gif"></img>