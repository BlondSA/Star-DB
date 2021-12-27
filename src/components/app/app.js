import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorMessage from "../error-message/error-message";
import PeoplePage from "../people-page";

import "./app.css";

class App extends Component {
    state = { hasError: false };

    componentDidCatch = () => {
        this.setState({ hasError: true });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorMessage />;
        }
        return (
            <div className="container">
                <Header />
                <RandomPlanet />
                <button className="btn btn-primary button">
                    Hide random planet
                </button>
                <PeoplePage />
                <PeoplePage />
                <PeoplePage />
            </div>
        );
    }
}

export default App;
