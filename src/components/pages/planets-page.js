import React from "react";
import Row from "../row/";
import { PlanetDetails, PlanetList } from "../sw-components";

class PlanetsPage extends React.Component {
    state = { selectedItem: null };

    onItemSelected = (id) => {
        this.setState({ selectedItem: id });
    };

    render() {
        const { selectedItem } = this.state;
        return (
            <Row
                left={<PlanetList onItemSelected={this.onItemSelected} />}
                right={<PlanetDetails selectedId={selectedItem} />}
            />
        );
    }
}

export default PlanetsPage;
