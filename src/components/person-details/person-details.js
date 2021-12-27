import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import ErrorMessage from "../error-message/error-message";
import Spinner from "../spinner";

import "./person-details.css";

export default class PersonDetails extends Component {
    swapiService = new SwapiService();

    state = { person: null, loading: true, error: false };

    componentDidMount = () => {
        this.updatePerson();
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.selectedId !== prevProps.selectedId) {
            this.updatePerson();
        }
    };

    onPersonLoaded = (person) => {
        this.setState({ person: person, loading: false, error: false });
    };

    onLoad = () => {
        this.setState({ loading: true });
    };

    onError = () => {
        this.setState({ error: true, loading: false });
    };

    updatePerson = () => {
        this.onLoad();
        const { selectedId } = this.props;
        if (!selectedId) {
            return;
        }
        this.swapiService
            .getPerson(selectedId)
            .then(this.onPersonLoaded)
            .catch(this.onError);
    };

    render() {
        const { person, loading, error } = this.state;

        if (!person) {
            return <h2>Select a person from a list</h2>;
        }

        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content =
            !loading && !error ? <ContentView person={person} /> : null;
        return (
            <div className="person-details card">
                {spinner}
                {errorMessage}
                {content}
            </div>
        );
    }
}

const ContentView = (props) => {
    const { person } = props;
    const { name, gender, birthDate, eyeColor } = person;
    return (
        <>
            <img
                className="person-image"
                src="https://starwars-visualguide.com/assets/img/characters/3.jpg"
                alt="person"
            />

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{birthDate}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
            </div>
        </>
    );
};
