import React, { Component } from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorMessage from "../error-message/error-message";
import "./app.css";
import ErrorBoundary from "../error-boundary";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";
import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StarshipDetails } from "../sw-components";

class App extends Component {
	state = { hasError: false, swapiService: new SwapiService() };

	componentDidCatch = () => {
		this.setState({ hasError: true });
	};

	onServiceChange = () => {
		this.setState(({ swapiService }) => {
			const Service =
				swapiService instanceof SwapiService
					? DummySwapiService
					: SwapiService;
			return { swapiService: new Service() };
		});
	};

	render() {
		if (this.state.hasError) {
			return <ErrorMessage />;
		}
		return (
			<ErrorBoundary>
				<SwapiServiceProvider value={this.state.swapiService}>
					<Router>
						<div className="stardb-app container">
							<Header onServiceChange={this.onServiceChange} />
							<RandomPlanet />
							<Route
								path="/"
								exact
								render={() => {
									return <h2>Welcome to StarDB</h2>;
								}}
							/>
							<Route
								path="/people"
								exact
								render={() => {
									return <h2>People</h2>;
								}}
							/>
							<Route
								path="/people"
								exact
								component={PeoplePage}
							/>
							<Route
								path="/planets"
								exact
								render={() => {
									return <h2>Planets</h2>;
								}}
							/>
							<Route
								path="/planets"
								exact
								component={PlanetsPage}
							/>
							<Route
								path="/starships"
								exact
								render={() => {
									return <h2>Starships</h2>;
								}}
							/>
							<Route
								path="/starships"
								exact
								component={StarshipsPage}
							/>
							<Route
								path="/starships/:id"
								render={(props) => {
									const {
										match: {
											params: { id },
										},
									} = props;
									console.log(props.match);
									return <StarshipDetails itemId={id} />;
								}}
							/>
						</div>
					</Router>
				</SwapiServiceProvider>
			</ErrorBoundary>
		);
	}
}

export default App;
