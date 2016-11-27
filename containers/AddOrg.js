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
        this.state = {

            name : '',
            shortName : '',
            date : ''

        };

        this.setOpeningDate = this.setOpeningDate.bind(this);
    }

    handleSubmit(){

        this.props.addNewOganisationUnit(this.state.name, this.state.shortName, this.state.date)
    }

    setOpeningDate(event) {

        console.log(event.target.value)
        this.setState({ date : event.target.value });
    }

    handleChange(e){
        console.log(e.target.id);

        switch (e.target.id){

            case 'name':
                console.log(e.target.value);
                this.setState({
                    name : e.target.value
                });
                break;
            case 'shortName':
                console.log(e.target.value);
                this.setState({
                    shortName : e.target.value
                });
                break;
        }
    }

    render(){

        return(
            <div>
                <Modal show={this.props.ui} >
                    <Modal.Header>
                        <Modal.Title>Add new Organisation Unit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form horizontal onSubmit={(e) => {this.handleSubmit(e)}}>
                        <FormGroup controlId="name" onSubmit={(e) => {this.handleSubmit(e)}}>
                            <Col componentClass={ControlLabel} sm={4}>
                                Name
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.name} onChange={(e) => {this.handleChange(e)}} placeholder="Name"/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="shortName">
                            <Col componentClass={ControlLabel} sm={4}>
                                Short Name
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.shortName} onChange={(e) => {this.handleChange(e)}} placeholder="Short Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="date">
                            <Col componentClass={ControlLabel} sm={4}>
                                Opening Date
                            </Col>
                            <Col sm={6}>
                                <input type="date" value={this.state.openingDate} onChange={this.setOpeningDate} />
                            </Col>
                        </FormGroup>
                     </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {this.handleSubmit()}}
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
