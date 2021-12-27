import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import "./item-list.css";
import Spinner from "./../spinner/spinner";
import ErrorMessage from "../error-message/error-message";

export default class ItemList extends Component {
    state = {
        peopleList: {},
        error: false,
        loading: true,
    };

    swapiService = new SwapiService();

    componentDidMount = () => {
        this.updateState();
    };

    onPeopleLoaded = (peopleList) => {
        this.setState({ peopleList: peopleList, loading: false, error: false });
    };

    onError = () => {
        this.setState({ error: true, loading: false });
    };

    updateState = () => {
        this.swapiService
            .getAllPeople()
            .then(this.onPeopleLoaded)
            .catch(this.onError);
    };

    render() {
        const { peopleList, loading, error } = this.state;
        const { onItemSelected } = this.props;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content =
            !loading && !error ? (
                <ContentView
                    peopleList={peopleList}
                    onItemSelected={onItemSelected}
                />
            ) : null;
        return (
            <ul className="item-list list-group">
                {spinner}
                {errorMessage}
                {content}
            </ul>
        );
    }
}

const ContentView = (props) => {
    const { peopleList, onItemSelected } = props;
    return peopleList.map((person) => {
        const { name, id } = person;
        return (
            <li
                className="list-group-item"
                key={id}
                onClick={() => onItemSelected(id)}
            >
                {name}
            </li>
        );
    });
};
