import PropTypes from "prop-types";
import React, { Component } from "react";
import Spinner from "../spinner";
import ErrorMessage from "../error-message/error-message";

import "./random-planet.css";
import SwapiService from "../../services/swapi-service";

export default class RandomPlanet extends Component {
    state = {
        loading: true,
        error: false,
        planet: {},
    };

    static defaultProps = { updateInterval: 10000 };

    swapiService = new SwapiService();

    componentDidMount = () => {
        const { updateInterval } = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet(), updateInterval);
    };

    componentWillUnmount = () => {
        clearInterval(this.interval);
    };

    onPlanetLoaded = (planet) => {
        this.setState({ planet, loading: false, error: false });
    };

    onError = () => {
        this.setState({ error: true, loading: false });
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 25) + 2;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render() {
        const { loading, planet, error } = this.state;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content =
            !loading && !error ? <PlanetView planet={planet} /> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {errorMessage}
                {content}
            </div>
        );
    }
}

RandomPlanet.propTypes = {
    updateInterval: PropTypes.number,
};

const PlanetView = ({ planet }) => {
    const { diameter, id, name, population, rotationPeriod } = planet;
    return (
        <React.Fragment>
            <img
                className="planet-image"
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                alt={`${name} Planet`}
            />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};
