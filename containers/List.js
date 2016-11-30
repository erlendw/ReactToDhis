import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem, Accordion, Panel} from 'react-bootstrap';
import * as actions from '../actions/actions';

/*
Creates the result list
*/
export function List({ organisations = [], onItemClick, props, map, singles, showchangeModalYo}) {
       
    const listItems = organisations
        .map((organisation,i) => {
            if(organisation.level == 1){
                return (
                <li key={organisation.id} className="list-element">
                    <div className="list-element-wrapper" onClick={() => onItemClick(organisation, props, map, singles)}>
                        <div className="list-element-header">
                            {organisation.displayName}
                        </div>
                        <div className="showhide" id={organisation.id}>
                           <div className="list-element-row">
                                 <div className="list-element-col"> <b>Type: </b></div><div className="list-element-col">Database</div>
                            </div>
                            <div className="list-element-row">
                                 <div className="list-element-col"> <b>Id: </b></div><div className="list-element-col">{organisation.id}</div>
                            </div>
                            <div className="list-element-row"><button type="button" onClick={() => showchangeModalYo(props, organisation)}>Edit</button></div>
                                            
                        </div>
                    </div>
                </li>
            );
            } 
            else if(organisation.level == 2){
                return (
                <li key={organisation.id} className="list-element">
                    <div className="list-element-wrapper">
                        <div className="list-element-header" onClick={() => onItemClick(organisation, props, map, singles)}>
                            {organisation.displayName}
                        </div>
                        <div className="showhide" id={organisation.id}>
                            <div className="list-element-row">
                                 <div className="list-element-col"> <b>Type: </b></div><div className="list-element-col">District</div>
                            </div>
                            <div className="list-element-row">
                                 <div className="list-element-col"> <b>Id: </b></div><div className="list-element-col">{organisation.id}</div>
                            </div>
                            <div className="list-element-row"><button type="button" onClick={() => showchangeModalYo(props, organisation)}>Edit</button></div>
                                            
                        </div>
                    </div>
                </li>
            );
            }  
            else if(organisation.level == 3){
                return (
                <li key={organisation.id} className="list-element">
                    <div className="list-element-wrapper">
                        <div className="list-element-header" onClick={() => onItemClick(organisation, props, map, singles)}>
                            {organisation.displayName}
                        </div>
                        <div className="showhide" id={organisation.id}>
                            <div className="list-element-row">
                                 <div className="list-element-col"> <b>Type: </b></div><div className="list-element-col">Chiefdom</div>
                            </div>
                            <div className="list-element-row">
                                 <div className="list-element-col"> <b>Id: </b></div><div className="list-element-col">{organisation.id}</div>
                            </div>
                            <div className="list-element-row">
                                 <div className="list-element-col"> <b>District: </b></div><div className="list-element-col">{organisation.parent.displayName}</div>
                            </div>  
                            <div className="list-element-row"><button type="button" onClick={() => showchangeModalYo(props, organisation)}>Edit</button></div>
                                            
                        </div>
                    </div>
                </li>
            );
            }         
            return (
                <li key={organisation.id} className="list-element">
                    <div className="list-element-wrapper">
                        <div className="list-element-header" onClick={() => onItemClick(organisation, props, map, singles)}>
                            {organisation.displayName}
                        </div>
                        <div className="showhide" id={organisation.id}>
                            <div className="list-element-row">
                                 <div className="list-element-col"> <b>Type: </b></div><div className="list-element-col">Facility</div>
                            </div>
                            <div className="list-element-row">
                                 <div className="list-element-col"> <b>Id: </b></div><div className="list-element-col">{organisation.id}</div>
                            </div>
                            <div className="list-element-row">
                                 <div className="list-element-col"> <b>District: </b></div><div className="list-element-col">{organisation.parent.parent.displayName}</div>
                            </div> 
                            <div className="list-element-row">
                                 <div className="list-element-col"> <b>Chiefdom: </b></div><div className="list-element-col">{organisation.parent.displayName}</div>
                            </div>                  
                            <div className="list-element-row"><button type="button" onClick={() => showchangeModalYo(props, organisation)}>Edit</button></div>
                                            
                        </div>
                    </div>
                </li>
            );
        });

    return (
       <ul className="list-o-rama">
        {listItems}
       </ul>
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
