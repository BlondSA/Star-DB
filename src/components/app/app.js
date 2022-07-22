import React, { Component } from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorMessage from "../error-message/error-message";
import "./app.css";
import ErrorBoundary from "../error-boundary";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";
import {
	PeoplePage,
	PlanetsPage,
	StarshipsPage,
	LoginPage,
	SecretPage,
} from "../pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StarshipDetails } from "../sw-components";

class App extends Component {
	state = {
		hasError: false,
		swapiService: new SwapiService(),
		isLoggedIn: false,
	};

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

	onLogin = () => {
		this.setState({ isLoggedIn: true });
	};

	render() {
		const { isLoggedIn } = this.state;
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
							<Switch>
								<Route
									path="/"
									exact
									render={() => {
										return <h2>Welcome to StarDB</h2>;
									}}
								/>

								<Route
									path="/people/:id?"
									exact
									component={PeoplePage}
								/>

								<Route
									path="/planets"
									exact
									component={PlanetsPage}
								/>

								<Route
									path="/starships"
									exact
									component={StarshipsPage}
								/>
								<Route
									path="/starships/:id"
									exact
									render={(props) => {
										const {
											match: {
												params: { id },
											},
										} = props;
										return (
											<StarshipDetails selectedId={id} />
										);
									}}
								/>
								<Route
									path="/login"
									render={() => {
										return (
											<LoginPage
												isLoggedIn={isLoggedIn}
												onLogin={this.onLogin}
											/>
										);
									}}
								/>
								<Route
									path="/secret"
									render={() => {
										return (
											<SecretPage
												isLoggedIn={isLoggedIn}
											/>
										);
									}}
								/>
								<Route
									render={() => {
										return <h2>Page not found</h2>;
									}}
								/>
							</Switch>
						</div>
					</Router>
				</SwapiServiceProvider>
			</ErrorBoundary>
		);
	}
}

export default App;
