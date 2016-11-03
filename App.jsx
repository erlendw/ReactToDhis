import React from 'react';

import { Button,Table,Navbar,Nav,NavItem,Form,ControlLabel, NavDropdown, FormGroup,FormControl, NavbarBrand, MenuItem,  } from 'react-bootstrap';
import { CreateStore } from 'redux';
import Request from 'superagent'
import btoa from 'btoa'
import $ from 'jquery'


class App extends React.Component {

    constructor() { //class constructor
        super();
        this.state = {
            settings: ['erlend','erlend', '1','1'],
            search : []
        };

    }

    search(e){


        console.log(e.target.value)

        var satan =[];

        //console.log(this.state.settings)

        this.state.settings.forEach(function (elem) {

            if(elem.displayName.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ){

                satan.push(elem)

            }

            
        })

        this.setState({search : satan})



    }

    componentWillMount (){
        var auth = btoa('admin:district');
        var settings = {
            "url": "https://play.dhis2.org/demo/api/organisationUnits.json?paging=false",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "authorization": "Basic " + auth
            }
        };

        $.ajax(settings).done((response) => {

            console.log(response.organisationUnits);
            this.setState({settings : response.organisationUnits});
            this.setState({search: response.organisationUnits })
        });
    }



    render() {
        return (
            <div>

                <Header />

                <FormControl
                    type="text"
                    placeholder="Enter text"
                    onChange={(e) => { this.search(e) }}
                />

                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Displayname</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.search.map(function (user,i) {


                        return <tr><td>{user.id}</td><td>{user.displayName}</td></tr>

                    })}
                    </tbody>

                </Table>

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
                            <a href="#">React-Bootstrap</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#">Link</NavItem>
                            <NavItem eventKey={2} href="#">Link</NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">Link Right</NavItem>
                            <NavItem eventKey={2} href="#">Link Right</NavItem>
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