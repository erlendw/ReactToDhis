/**
 * Created by erlend on 09.11.2016.
 */
import { Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem,  } from 'react-bootstrap';
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {recievedOrganisations, fetchOrganisations, findMatchingElements} from '../actions/actions'
class Search extends React.Component {

    componentWillMount(){
        this.props.fetchOrganisations()
    }

    render() {
        return (
            <div>
                <FormControl
                    type="text"
                    placeholder="Enter text"
                    onChange={ (text) => { this.props.findMatchingElements( this.props.organisations, text) }}
                />

                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Displayname</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.search.map(function (organisations,i) {
                        return <tr key={organisations.id}><td>{organisations.id}</td><td>{organisations.displayName}</td></tr>
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        organisations: state.organisations,
        search: state.search
    }

}

function matchDispatchToProps(dispatch){
    return bindActionCreators({recievedOrganisations: recievedOrganisations, fetchOrganisations : fetchOrganisations, findMatchingElements : findMatchingElements},dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);