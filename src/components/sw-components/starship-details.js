import React from "react";
import ItemDetails, { Record } from "../item-details";
import { withSwapiService } from "../hoc-helpers";

const StarshipDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field="model" label="Model" />
            <Record field="cargo" label="Cargo" />
            <Record field="cost" label="Coast" />
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService) => {
    return { getData: swapiService.getStarship };
};

export default withSwapiService(StarshipDetails, mapMethodsToProps);
