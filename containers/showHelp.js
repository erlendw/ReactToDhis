/**
 * Created by erlend on 16.11.2016.
 */
import React from 'react';
import {connect} from 'react-redux';

import {showAddOrgModal, addNewOganisationUnit} from '../actions/actions'


import {Modal,OverlayTrigger, Button, ControlLabel, FormControl, FormGroup, Col, Form} from 'react-bootstrap'

class AddOrg extends React.Component {

    constructor(){
        super();


        
    }

   




    

    render(){

        return(
            <div>
                <Modal show={this.props.showHelp} >
                    <Modal.Header>
                        <Modal.Title>Help</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    

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
