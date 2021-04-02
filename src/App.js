import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import MainPage from "./Pages/MainPage/MainPage";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                </Switch>
            </Router>
        );
    }
}

export default App;