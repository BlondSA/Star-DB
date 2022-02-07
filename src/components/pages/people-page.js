import React from "react";
import Row from "../UI/row";
import { PersonDetails, PersonList } from "../sw-components";

class PeoplePage extends React.Component {
    state = { selectedItem: null };

    onItemSelected = (id) => {
        this.setState({ selectedItem: id });
    };

    render() {
        const { selectedItem } = this.state;
        return (
            <Row
                left={<PersonList onItemSelected={this.onItemSelected} />}
                right={<PersonDetails selectedId={selectedItem} />}
            />
        );
    }
}

export default PeoplePage;
