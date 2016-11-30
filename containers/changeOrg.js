import React from 'react';
import {connect} from 'react-redux';
import {showChangeOrgModal, addNewOganisationUnit} from '../actions/actions'
import {Modal, Button} from 'react-bootstrap'
import DistrictForm from './forms/districtForm'
import ContryForm from './forms/contryForm'
import FacilityForm from './forms/facilityForm'
import ChiefdomForm from './forms/chiefdomForm'

/*
Component for the "edit unit" modal
*/
class AddOrg extends React.Component {
    constructor(){
        super();
        this.state = {

            name : '',
            longitude : '',
            latitude : ''

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

        var org = this.props.currentOrg;
        var modalToShow = null;

        switch(org.level){

            case 1:
                modalToShow = <ContryForm/>;
                break;
            case 2:
                modalToShow = <DistrictForm/>;
                break;
            case 3:
                modalToShow = <ChiefdomForm/>;
                break;
            case 4:
                modalToShow = <FacilityForm/>;
                break;
            default:
                break

        }

        return(
            <div>
                <Modal show={this.props.changeOrg} >
                    
                    {modalToShow}

                </Modal>





            </div>


        )

    }

}


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

export default connect(mapStateToProps, mapDispatchToProps)(AddOrg);
