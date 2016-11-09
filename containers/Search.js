/**
 * Created by erlend on 09.11.2016.
 */

import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateSearch} from '../actions/actions'
class Search extends React.Component {
    render() {
        return (
            <div onClick={() =>this.props.updateSearch(this.props.organisations[0].erled)}>
                {this.props.organisations[0].erled}
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
    return bindActionCreators({updateSearch: updateSearch},dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);