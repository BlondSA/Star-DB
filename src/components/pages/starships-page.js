import React from "react";
import Row from "../row/";
import { StarshipDetails } from "../sw-components";
import { StarshipList } from "../sw-components";

class StarshipsPage extends React.Component {
    state = { selectedItem: null };

    onItemSelected = (id) => {
        this.setState({ selectedItem: id });
    };

    render() {
        const { selectedItem } = this.state;
        return (
            <Row
                left={<StarshipList onItemSelected={this.onItemSelected} />}
                right={<StarshipDetails selectedId={selectedItem} />}
            />
        );
    }
}

export default StarshipsPage;
