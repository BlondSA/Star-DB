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
							<Route path="/people" component={PeoplePage} />
							<Route path="/planets" component={PlanetsPage} />
							<Route
								path="/starships"
								component={StarshipsPage}
							/>
						</div>
					</Router>
				</SwapiServiceProvider>
			</ErrorBoundary>
		);
	}
}

export default App;
