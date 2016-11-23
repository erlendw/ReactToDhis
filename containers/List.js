import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem, Accordion, Panel} from 'react-bootstrap';
import * as actions from '../actions/actions';

export function List({ organisations = [], onItemClick, props, map, singles}) {

    const listItems = organisations
        .map((organisation,i) => {
            if(organisation.level == 1){
                return (
                <Panel header={organisation.displayName} eventKey={i} key={i}>
                    <ControlLabel>Type: </ControlLabel><p>Database</p>
                    <ControlLabel>Id: </ControlLabel><p>{organisation.id}</p>
                    <Button  onClick={() => onItemClick(organisation, props, map, singles)}>Show on Map</Button>
                </Panel>
            );
            } 
            else if(organisation.level == 2){
                return (
                <Panel header={organisation.displayName} eventKey={i} key={i}>
                    <ControlLabel>Type: </ControlLabel><p>District</p>
                    <ControlLabel>Id: </ControlLabel><p>{organisation.id}</p>
                    <Button  onClick={() => onItemClick(organisation, props, map, singles)}>Show on Map</Button>
                </Panel>
            );
            }  
            else if(organisation.level == 3){
                return (
                <Panel header={organisation.displayName} eventKey={i} key={i}>
                    <ControlLabel>Type: </ControlLabel><p>Chiefdom</p>
                    <ControlLabel>Id: </ControlLabel><p>{organisation.id}</p>
                    <ControlLabel>District: </ControlLabel><p>{organisation.parent.displayName}</p>
                    <Button  onClick={() => onItemClick(organisation, props, map, singles)}>Show on Map</Button>
                </Panel>
            );
            }         
            return (
                <Panel header={organisation.displayName} eventKey={i} key={i}>
                    <ControlLabel>Type: </ControlLabel><p>Facility</p>
                    <ControlLabel>Id: </ControlLabel><p>{organisation.id}</p>
                    <ControlLabel>Chiefdom: </ControlLabel><p>{organisation.parent.displayName}</p>

                    <ControlLabel>District: </ControlLabel><p>{organisation.parent.parent.displayName}</p>
                    <Button onClick={() => onItemClick(organisation, props, map, singles)}>Show on Map</Button>
                </Panel>
            );
        });

    return (
        <Accordion>
        {listItems}
        </Accordion>
    );
}

List.propTypes = {
    items: PropTypes.array,
    onItemClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.search
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLocation: name => dispatch(actions.getLocation(name))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
