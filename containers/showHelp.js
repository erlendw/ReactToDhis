import React from 'react';
import {connect} from 'react-redux';
import {showAddOrgModal, addNewOganisationUnit, showHelpModal} from '../actions/actions'
import {Modal,OverlayTrigger, Button, ControlLabel, FormControl, FormGroup, Col, Form, h4} from 'react-bootstrap'

/*
Component for the help modal
*/
class AddOrg extends React.Component {

    constructor(){
        super();    
    }

    render(){
        return(
            <div>
                <Modal show={this.props.showHelp} bsSize="large">
                    <Modal.Header>
                        <Modal.Title>Help</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>General</h4>
                        <p>
                            With this application you can browse the organisation units from the
                            Sierra Leone database in DHIS2. 
                            You can use the live search to find a specific unit or use the map 
                            to find units for the specific areas.
                        </p>

                        <hr/>

                        <h4>Live Search</h4>
                        <p>
                            The live search finds units that matches your text in the search bar.
                            You can also filter your results by level with the dropdown menu.
                        </p>
                        <p>
                            The results list show you the result of your search. Each element in the 
                            list is clickable. When clicked, if DHIS2 has the coordinates, the location 
                            of the unit will be displayed on the map. If the unit clicked is a facility
                            a marker will appear on the map and if the unit is either a district or a 
                            chiefdom the border will be displayed.
                        </p>
                        <hr/>
                        <h4>Edit a unit</h4>
                        <p>
                            When an element in the list is clicked, useful information about this unit will 
                            appear. An "edit" button will also appear. Clicking this will display a window in 
                            which you can edit the different fields of the unit.
                        </p>

                        <hr/>

                        <h4>Map</h4>
                        <p>
                            When the application is loaded all facilities to which DHIS2 has the coordinates
                            will appear as small, blue markers on the map. These are clickable and will show
                            some information about the facility. 
                        </p>
                        <p>
                            You have to option show different border overlays on the map. You can show either districts
                            or chiefdoms. When the districts are displayed, you can click any district and the map will 
                            zoom in and show all the chiefdoms in the district. These chiefdoms will also appear in the
                            results list. The overlays of the chiefdoms can also be clicked and will show a list of the
                            facilities in that chiefdom. This is also the case when you choose to display all the chiefdom
                            overlays.
                        </p>
                        <hr/>
                        <h4>Add a new unit</h4>
                        <p><b>NB! Border overlays must be switched off to access this functionality</b></p>
                        <p>
                            To add a new unit, simply click the map at any location and a window will appear. This  
                            window contains input fields. Fill these out and click the "submit" button. This will 
                            post the new unit with the information from the input fields and the location where you
                            clicked the map.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {this.props.showHelpModal(false)}}
                        >Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        showHelp : state.showHelp
    }

};

const mapDispatchToProps = (dispatch) => {
    return {

        showHelpModal: b => dispatch(showHelpModal(b)),
        
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrg);