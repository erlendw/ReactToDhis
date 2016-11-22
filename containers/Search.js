/**
 * Created by erlend on 09.11.2016.
 */
import { Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem, DropdownButton, Well, Panel} from 'react-bootstrap';
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {recievedOrganisations, fetchOrganisations, findMatchingElements, getLocation, changeLevel, showAddOrgModal} from '../actions/actions'
import List from './List';
import {Gmaps, Marker, InfoWindow, Circle, Polygon} from 'react-gmaps';


const coords = {
  lat: 8.48059,
  lng: -11.8085401
};
const test =[
  {lat: 25.774, lng: -80.190},
  {lat: 18.466, lng: -66.118},
  {lat: 32.321, lng: -64.757}
];

var w = window.innerWidth - window.innerWidth/3;
var h = window.innerHeight - 85;
const color = '#FF0000';
var markerImg= 'containers/marker.png';

class Search extends React.Component {

    componentWillMount(){
        this.props.fetchOrganisations()
    }

    onItemClick(item, parent) {
        console.log(parent);
        console.log(item.displayName)
        parent.getLocation(item.displayName, item);   
    }
    onMapCreated(m){
        console.log(m);
        console.log(Gmaps);
        var myLatlng = new google.maps.LatLng(-25.363882,131.044922);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(m);
    }

    render() {
        

        return (
            
            <div id="wrapper">
                <div id="search">
                    <div id="filter">
                        <Well>
                            <ControlLabel>Filter:</ControlLabel><br/>
                            <select id="select" onChange={(e) => this.props.changeLevel(e,this.props.search,this.props.organisations)} defaultValue="">
                                <option value="" disabled>Level--</option>
                                <option value="5">All levels</option>
                                <option value="2">District</option>
                                <option value="3">Chiefdoms</option>
                                <option value="4">Facilities</option>
                            </select>
                            <FormControl
                                type="text"
                                placeholder="Search Organisation Units..."
                                onChange={ (text) => { this.props.findMatchingElements( this.props.organisations, text) }}
                            />

                            <Button
                                bsStyle="primary"
                                bsSize="large"
                                onClick={() => {this.props.showAddOrgModal(true)}}
                            >
                                Launch demo modal
                            </Button>

                        </Well>
                    </div>                 
                    <div id="results">
                        <Panel header="Results:">
                            <div id="results-wrapper">
                            <List
                                onItemClick={this.onItemClick}
                                organisations={this.props.search}
                                props={this.props}
                            />
                            </div>
                        </Panel>
                    </div>

                </div>
                <div id="map">
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        organisations: state.organisations,
        search: state.search,
        markers: state.markers,
        ui : state.ui

    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        recievedOrganisations: payload => dispatch(recievedOrganisations(payload)),
        fetchOrganisations : () => dispatch(fetchOrganisations()), 
        findMatchingElements : (data, search) => dispatch(findMatchingElements(data, search)),
        getLocation: name => dispatch(getLocation(name)),
        changeLevel: (level, search, organisations) => dispatch(changeLevel(level, search, organisations)),
        showAddOrgModal: b => dispatch(showAddOrgModal(b))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

