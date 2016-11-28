/**
 * Created by erlend on 26.11.2016.
 */
import { Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem, DropdownButton, Well, Panel, ButtonGroup, hr} from 'react-bootstrap';
import React from 'react'
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {recievedOrganisations, fetchOrganisations, findMatchingElements, getLocation, changeLevel, showAddOrgModal, showDistrictBorder, showChiefdomBorder, showNoBorder, createChildPolygon, updateSearch, addNewOganisationUnit, editOganisationUnit} from '../actions/actions'
import List from './List';
import {Gmaps, Marker, InfoWindow, Circle, Polygon} from 'react-gmaps';
import {initMap} from './mapfunctions.js'
import {Row, Col} from 'react-bootstrap'


import loadGoogleMapsAPI from 'load-google-maps-api';

class Map extends React.Component {

    componentWillMount(){
        //this.props.showChangeOrgModal(true);
    }

    componentDidMount(){
        console.log(this);
        // Options for the Google Maps API
        var gooogleOptions ={
            key: "AIzaSyDtsokboJ-exluz1PyeU6YrsEAoQSRvaDo"
        };

        loadGoogleMapsAPI(gooogleOptions).then((googleMaps) => {

            //init the map
           var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: {lat: 8.48059, lng: -11.8085401},
                mapTypeId: 'terrain',

            });


        });

        this.props.fetchOrganisations(map)



    }


    render() {
        return (
            <div>

                <div id="map"></div>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        addOrg : state.addOrg
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrganisations : (map) => dispatch(fetchOrganisations(map))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
