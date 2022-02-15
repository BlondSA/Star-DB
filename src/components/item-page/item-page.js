import React, { Component } from "react";
import "./item-page.css";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row/";
import ErrorBoundary from "../error-boundary/";

export default class ItemPage extends Component {
    state = {
        hasError: false,
        selectedId: null,
    };

    swapiService = new SwapiService();

    onItemSelected = (id) => {
        this.setState({ selectedId: id });
    };

    render() {
        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.swapiService.getAllPeople}
            >
                {(item) => `${item.name}`}
            </ItemList>
        );

        const itemDetails = (
            <PersonDetails selectedId={this.state.selectedId} />
        );

        return (
            <ErrorBoundary>
                <Row left={itemList} right={itemDetails} />
            </ErrorBoundary>
        );
    }
}
