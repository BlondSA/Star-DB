import React from "react";
import ItemList from "../item-list";
import { withChildFunction, withData, withSwapiService } from "../hoc-helpers";

const renderName = (item) => {
    return <span>{item.name}</span>;
};

const renderModelAndName = (item) => {
    return (
        <span>
            {item.name}, {item.model}
        </span>
    );
};

const mapPersonMethodsToProps = (swapiService) => {
    return { getData: swapiService.getAllPeople };
};

const mapPlanetMethodsToProps = (swapiService) => {
    return { getData: swapiService.getAllPlanets };
};

const mapStarshipMethodsToProps = (swapiService) => {
    return { getData: swapiService.getAllStarships };
};

const PersonList = withSwapiService(mapPersonMethodsToProps)(
    withData(withChildFunction(renderName)(ItemList))
);
const PlanetList = withSwapiService(mapPlanetMethodsToProps)(
    withData(withChildFunction(renderName)(ItemList))
);
const StarshipList = withSwapiService(mapStarshipMethodsToProps)(
    withData(withChildFunction(renderModelAndName)(ItemList))
);

export { PersonList, PlanetList, StarshipList };
