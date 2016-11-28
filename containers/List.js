import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem, Accordion, Panel} from 'react-bootstrap';
import * as actions from '../actions/actions';

export function List({ organisations = [], onItemClick, props, map, singles}) {

    const listItems = organisations
        .map((organisation,i) => {
           return(
            <li key={organisation.id} className="list-element">
              <div className="list-element-wrapper">
                  <div className="list-element-header" onClick={() => onItemClick(organisation, props, map, singles)}>
                      {organisation.displayName}
                  </div>
                  <div className="showhide" id={organisation.id}>
                      {organisation.id}<br/>
                    
                      

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
