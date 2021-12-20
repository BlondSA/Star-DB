import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import "./item-list.css";
import Spinner from "./../spinner/spinner";
import ErrorMessage from "../error-message/error-message";
import { extractId } from "../../utils/utils";

export default class ItemList extends Component {
    state = {
        peopleList: null,
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

    onLoad = () => {
        this.setState({ loading: true });
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
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content =
            !loading && !error ? <ContentView peopleList={peopleList} /> : null;
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
    const { peopleList } = props;
    return peopleList.map((person) => {
        const idPerson = extractId(person);
        return (
            <li className="list-group-item" key={idPerson}>
                {person.name}
            </li>
        );
    });
};
