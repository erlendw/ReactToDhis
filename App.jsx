import React from 'react';

import { Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem,  } from 'react-bootstrap';
import { CreateStore } from 'redux';
import Search from './containers/Search'
import Request from 'superagent'
import btoa from 'btoa'
import $ from 'jquery'


class App extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <Search />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Forget about dhis</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#">REACTing to YOUR FACE or something, I don't know</NavItem>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
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