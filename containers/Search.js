/**
 * Created by erlend on 09.11.2016.
 */

import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {recievedOrganisations, fetchOrganisations} from '../actions/actions'
class Search extends React.Component {

    componentWillMount(){

        this.props.fetchOrganisations()

    }

    render() {
        return (
            <div onClick={() => this.props.fetchOrganisations()}>
                ERLEND
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        organisations: state.organisations
    }

}

function matchDispatchToProps(dispatch){
    return bindActionCreators({recievedOrganisations: recievedOrganisations, fetchOrganisations : fetchOrganisations},dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);