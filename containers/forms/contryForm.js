/**
 * Created by erlend on 29.11.2016.
 */


import React from 'react';
import {connect} from 'react-redux';

import {showChangeOrgModal, addNewOganisationUnit} from '../../actions/actions'


import { Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem, DropdownButton, Well, Panel, ButtonGroup, hr} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux'

class contryForm extends React.Component {

    render(){

        return(
            <div></div>
        )
    }

};


const mapStateToProps = (state) => {
    return{
        changeOrg : state.changeOrg,
        currentOrg: state.currentOrg
    }

};

const mapDispatchToProps = (dispatch) => {
    return {

        showChangeOrgModal : (b) => {dispatch(showChangeOrgModal(b))},
        addNewOganisationUnit: (name, shortName, openingDate) => dispatch(addNewOganisationUnit(name, shortName, openingDate))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(contryForm);