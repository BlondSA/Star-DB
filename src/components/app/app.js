import React, { Component } from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorMessage from "../error-message/error-message";
import "./app.css";
import ErrorBoundary from "../error-boundary";
import Row from "../UI/row";
import {
    PersonDetails,
    PersonList,
    PlanetDetails,
    PlanetList,
    StarshipDetails,
    StarshipList,
} from "../sw-components";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";

class App extends Component {
    state = { hasError: false, swapiService: new SwapiService() };

    componentDidCatch = () => {
        this.setState({ hasError: true });
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
            const Service =
                swapiService instanceof SwapiService
                    ? DummySwapiService
                    : SwapiService;
            return { swapiService: new Service() };
        });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorMessage />;
        }
        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="stardb-app container">
                        <Header onServiceChange={this.onServiceChange} />
                        <RandomPlanet />
                        <Row
                            left={<PersonList />}
                            right={<PersonDetails selectedId={11} />}
                        />
                        <Row
                            left={<PlanetList />}
                            right={<PlanetDetails selectedId={5} />}
                        />
                        <Row
                            left={<StarshipList />}
                            right={<StarshipDetails selectedId={9} />}
                        />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
}

export default App;
