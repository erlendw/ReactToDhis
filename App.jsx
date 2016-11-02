import React from 'react';

import { Button } from 'react-bootstrap';
import { CreateStore } from 'redux';
import Request from 'superagent'

class App extends React.Component {

    constructor() { //class constructor
        super();
        this.state = {
            svampebober: "jeg er svampebob"
        };

    }

    componentWillMount() {
    }

    clicked(innnn) {
        console.log("was clicked son")

        this.setState({ svampebober: innnn });

    }

    render() {
        return (
            <div className="container-fluid">
                {this.state.svampebober}
                <Button bsStyle="primary" bsSize="large" onClick={(e) => { this.clicked("jeg er ikke svampebob") } } >Large button</Button>
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Header</h1>
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