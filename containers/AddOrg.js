/**
 * Created by erlend on 16.11.2016.
 */
import React from 'react';
import {connect} from 'react-redux';

import {showAddOrgModal, addNewOganisationUnit} from '../actions/actions'


import {Modal,OverlayTrigge, Button, ControlLabel, FormControl, FormGroup, Col, Form} from 'react-bootstrap'

var adate = new Date();
class AddOrg extends React.Component {

    render(){

        return(
            <div>
                <Modal show={this.props.ui} >
                    <Modal.Header>
                        <Modal.Title>Add new Organisation Unit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={4}>
                                Name
                            </Col>
                            <Col sm={6}>
                                <FormControl placeholder="Name"/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={4}>
                                Short Name
                            </Col>
                            <Col sm={6}>
                                <FormControl placeholder="Short Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={4}>
                                Opening Date
                            </Col>
                            <Col sm={6}>
                                <input type="date"/>
                            </Col>
                        </FormGroup>
                     </Form>   
                        


                        

                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {this.props.addNewOganisationUnit("A Name", "A short Name", adate)}}
                        >Submit</Button>
                        <Button
                            onClick={() => {this.props.showAddOrgModal(false)}}
                        >Close</Button>
                    </Modal.Footer>
                </Modal>



            </div>


        )

    }

}


const mapStateToProps = (state) => {
    return{
        ui : state.ui
    }

};

const mapDispatchToProps = (dispatch) => {
    return {

        showAddOrgModal: b => dispatch(showAddOrgModal(b)),
        addNewOganisationUnit: (name, shortName, openingDate) => dispatch(addNewOganisationUnit(name, shortName, openingDate))
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrg);
