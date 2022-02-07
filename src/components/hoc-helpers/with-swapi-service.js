import React from "react";

import { SwapiServiceConsumer } from "../swapi-service-context/";

const withSwapiService = (Wrapped, mapMethodsToProps) => {
    return (props) => {
        return (
            <SwapiServiceConsumer>
                {(swapiService) => {
                    const serviceToProps = mapMethodsToProps(swapiService);
                    return <Wrapped {...props} {...serviceToProps} />;
                }}
            </SwapiServiceConsumer>
        );
    };
};

export default withSwapiService;
