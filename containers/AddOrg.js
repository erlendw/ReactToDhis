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
            displayName : '',
            diasplayShortName : '',
            longitude : '',
            lattitude: '',
            date:''

        };

        this.setOpeningDate = this.setOpeningDate.bind(this);
        
    }

    closeModal(){

        this.setState({

            name : '',
            shortName : '',
            displayName : '',
            diasplayShortName : '',
            longitude : '',
            lattitude: '',
            date:''
        })

        this.props.showAddOrgModal(false)


    }

    handleSubmit(){

        this.props.addNewOganisationUnit(this.state.name, this.state.shortName, this.state.displayName, this.state.diasplayShortName, this.state.longitude, this.state.lattitude, this.state.date);
        this.props.showAddOrgModal(false)
    }

    setOpeningDate(event) {
        console.log(event.target.value)
        this.setState({ date : event.target.value });
        console.log(this.state.date);
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
            case 'displayName':
                console.log(e.target.value);
                this.setState({
                    displayName : e.target.value
                });
                break;
            case 'diasplayShortName':
                console.log(e.target.value);
                this.setState({
                    diasplayShortName : e.target.value
                });
                break;
            case 'longitude':
                console.log(e.target.value);
                this.setState({
                    longitude : e.target.value
                });
                break;
            case 'lattitude':
                console.log(e.target.value);
                this.setState({
                    lattitude : e.target.value
                });
                break;
        }
    }

    componentDidUpdate(){

        if(this.state.longitude == '' && this.state.lattitude == ''){
            this.setState({
                longitude : this.props.currentOrg.longitude,
                lattitude: this.props.currentOrg.lattitude
            })
        }



    }

    render(){

        return(
            <div>
                <Modal show={this.props.addOrg} >
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
                                        <FormControl value={this.state.name} onChange={(e) => {this.handleChange(e)}} placeholder="Input name"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="shortName">
                                    <Col componentClass={ControlLabel} sm={4}>
                                        Short name
                                    </Col>
                                    <Col sm={6}>
                                        <FormControl value={this.state.shortName} onChange={(e) => {this.handleChange(e)}} placeholder="Input short name"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="displayName" onSubmit={(e) => {this.handleSubmit(e)}}>
                                    <Col componentClass={ControlLabel} sm={4}>
                                        Display name
                                    </Col>
                                    <Col sm={6}>
                                        <FormControl value={this.state.displayName} onChange={(e) => {this.handleChange(e)}} placeholder="Input display name"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="diasplayShortName">
                                    <Col componentClass={ControlLabel} sm={4}>
                                        Short display name
                                    </Col>
                                    <Col sm={6}>
                                        <FormControl value={this.state.diasplayShortName} onChange={(e) => {this.handleChange(e)}} placeholder="Input short display name" />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="longitude">
                                    <Col componentClass={ControlLabel} sm={4}>
                                        Longitude
                                    </Col>
                                    <Col sm={6}>
                                        <FormControl type="number" value={this.state.longitude} onChange={(e) => {this.handleChange(e)}} placeholder="pleace enter lattitude"/>
                                    </Col>
                                </FormGroup>


                                <FormGroup controlId="lattitude">
                                    <Col componentClass={ControlLabel} sm={4}>
                                        Lattitude
                                    </Col>
                                    <Col sm={6}>
                                        <FormControl type="number" value={this.state.lattitude} onChange={(e) => {this.handleChange(e)}} placeholder="pleace enter longitude" />
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
                            onClick={() => {this.closeModal()}}
                        >Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>


        )

    }

}


const mapStateToProps = (state) => {
    return{
        addOrg : state.addOrg,
        currentOrg : state.currentOrg
    }

};

const mapDispatchToProps = (dispatch) => {
    return {

        showAddOrgModal: b => dispatch(showAddOrgModal(b)),
        addNewOganisationUnit: (name, shortName, openingDate) => dispatch(addNewOganisationUnit(name, shortName, openingDate))
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrg);