import React from 'react';

import { Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem,  } from 'react-bootstrap';
import {Route, Router, browserHistory} from 'react-router'
import { CreateStore } from 'redux';
import Search from './containers/Search'
import AddOrg from './containers/AddOrg'
import Header from './containers/Header'





class App extends React.Component {

    render() {
        return (
            /*
            <Router history={browserHistory}>

                <Route path="/" component={Header}/>

            </Router>
*/
  <div>
                <AddOrg />
                <Header />
                <Search />
            </div>
        );
    }
}



class Content extends React.Component {
    render() {
        return (
            <div>
                <h2>Content</h2>
                <p>The content text!!!</p>
            </div>
        );
    }
}

class Footer extends React.Component {
    render() {
        return (
            <div>
                <h2>I am the footer</h2>
            </div>
        );
    }
}

export default App;