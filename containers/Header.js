/**
 * Created by erlend on 26.11.2016.
 */

import { Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem, DropdownButton, Well, Panel, ButtonGroup, hr} from 'react-bootstrap';
import React from 'react'
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {recievedOrganisations, fetchOrganisations, showAddOrgModal} from '../actions/actions'
import AddOrg from './AddOrg'


class Header extends React.Component {

    componentWillMount(){
        this.props.showAddOrgModal(true);
    }


    render() {
        return (
            <div>
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">React To DHIS</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#">Browse the Organisation Units in DHIS2</NavItem>
                        </Nav>

                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">Help</NavItem>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
                
                <AddOrg/>
                
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        ui : state.ui
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
       showAddOrgModal : (b) => {dispatch(showAddOrgModal(b))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
