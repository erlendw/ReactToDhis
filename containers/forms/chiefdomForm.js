/**
 * Created by erlend on 29.11.2016.
 */


import React from 'react';
import {connect} from 'react-redux';

import {showChangeOrgModal, addNewOganisationUnit} from '../../actions/actions'


import { Modal, Col, Row,Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem, DropdownButton, Well, Panel, ButtonGroup, hr} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux'


class chiefdomForm extends React.Component {

    constructor(){
        super();
        this.state = {

            name : '',
            shortname : '',
            displayname : '',
            diasplayshortname : ''

        };
    }

    handleSubmit(){

        this.props.addNewOganisationUnit(this.state.name, this.state.shortName, this.state.date)
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
                    displayname : e.target.value
                });
                break;
            case 'diasplayShortName':
                console.log(e.target.value);
                this.setState({
                    diasplayshortname : e.target.value
                });
                break;
        }
    }

    render(){

        return(

            <div>

                {/*http://www.imdb.com/title/tt2356302/*/}

                <Modal.Header>
                    <Modal.Title>{this.props.currentOrg.name} : {this.props.currentOrg.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal onSubmit={(e) => {this.handleSubmit(e)}}>
                        <FormGroup controlId="name" onSubmit={(e) => {this.handleSubmit(e)}}>
                            <Col componentClass={ControlLabel} sm={4}>
                                Name
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.name} onChange={(e) => {this.handleChange(e)}} placeholder={this.props.currentOrg.name}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="shortName">
                            <Col componentClass={ControlLabel} sm={4}>
                                Short Name
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.shortName} onChange={(e) => {this.handleChange(e)}} placeholder={this.props.currentOrg.shortName}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="displayName" onSubmit={(e) => {this.handleSubmit(e)}}>
                            <Col componentClass={ControlLabel} sm={4}>
                                Name
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.displayname} onChange={(e) => {this.handleChange(e)}} placeholder={this.props.currentOrg.displayName}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="diasplayShortName">
                            <Col componentClass={ControlLabel} sm={4}>
                                Short Name
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.diasplayshortname} onChange={(e) => {this.handleChange(e)}} placeholder={this.props.currentOrg.displayShortName} />
                            </Col>
                        </FormGroup>

                    </Form>

                </Modal.Body>

            </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(chiefdomForm);