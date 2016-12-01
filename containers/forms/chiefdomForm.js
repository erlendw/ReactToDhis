/**
 * Created by erlend on 29.11.2016.
 */


import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux'
import {showChangeOrgModal, editOganisationUnit} from '../../actions/actions'
import { Modal, Col, Row,Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem, DropdownButton, Well, Panel, ButtonGroup, hr} from 'react-bootstrap';



/*

 Felter i district

 1: name
 2: shortName
 3: Displayneme
 4: DisplayShortname

 */

class chiefdomForm extends React.Component {


    constructor(){
        super();
        this.state = {

            name : '',
            shortName : '',
            displayName : '',
            displayShortName : ''

        };
    }

    handleSubmit(){

        this.props.editOganisationUnit(this);
        this.props.showChangeOrgModal(false);
    }


    handleChange(e){


        switch (e.target.id){

            case 'name':

                this.setState({
                    name : e.target.value
                });
                break;
            case 'shortName':

                this.setState({
                    shortName : e.target.value
                });
                break;
            case 'displayName':

                this.setState({
                    displayName : e.target.value
                });
                break;
            case 'displayShortName':
 
                this.setState({
                    displayShortName : e.target.value
                });
                break;
        }
    }

    render(){

        return(

            <div>

                {/*http://www.imdb.com/title/tt2356302/*/}

                <Modal.Header>
                    <Modal.Title>{this.props.currentOrg.name} : district {this.props.currentOrg.id}</Modal.Title>
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
                                Short name
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.shortName} onChange={(e) => {this.handleChange(e)}} placeholder={this.props.currentOrg.shortName}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="displayName" onSubmit={(e) => {this.handleSubmit(e)}}>
                            <Col componentClass={ControlLabel} sm={4}>
                                Display name
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.displayName} onChange={(e) => {this.handleChange(e)}} placeholder={this.props.currentOrg.displayName}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="displayShortName">
                            <Col componentClass={ControlLabel} sm={4}>
                                Short display name
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.displayShortName} onChange={(e) => {this.handleChange(e)}} placeholder={this.props.currentOrg.displayShortName} />
                            </Col>
                        </FormGroup>

                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={() => {this.handleSubmit()}}
                    >Submit</Button>
                    <Button
                        onClick={() => {this.props.showChangeOrgModal(false)}}
                    >Close</Button>
                </Modal.Footer>

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
        editOganisationUnit: (state) => dispatch(editOganisationUnit(state))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(chiefdomForm);