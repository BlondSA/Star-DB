import React, { Component } from "react";
import ErrorMessage from "../error-message/error-message";
import Spinner from "../spinner";

import "./item-details.css";

const Record = ({ item, field, label }) => {
	return (
		<li className="list-group-item">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	);
};

export { Record };

export default class ItemDetails extends Component {
	state = { item: null, loading: true, error: false };

	componentDidMount = () => {
		this.updateItem();
	};

	componentDidUpdate = (prevProps) => {
		if (
			this.props.selectedId !== prevProps.selectedId ||
			this.props.getData !== prevProps.getData
		) {
			this.updateItem();
		}
	};

	onItemLoaded = (item) => {
		this.setState({ item: item, loading: false, error: false });
	};

	onLoad = () => {
		this.setState({ loading: true });
	};

	onError = () => {
		this.setState({ error: true, loading: false });
	};

	updateItem = () => {
		this.onLoad();
		const { selectedId, getData } = this.props;
		if (!selectedId) {
			return;
		}
		getData(selectedId).then(this.onItemLoaded).catch(this.onError);
	};

	render() {
		const { item, loading, error } = this.state;
		const { children } = this.props;

		if (!item) {
			return <h2>Select a item from a list</h2>;
		}

		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const content =
			!loading && !error ? (
				<ContentView item={item} children={children} />
			) : null;
		return (
			<div className="item-details card">
				{spinner}
				{errorMessage}
				{content}
			</div>
		);
	}
}

const ContentView = (props) => {
	const { item, children } = props;
	const { name, imageUrl } = item;
	return (
		<>
			<img className="item-image" src={imageUrl} alt="item" />
			<div className="card-body">
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					{React.Children.map(children, (child) => {
						return React.cloneElement(child, { item });
					})}
				</ul>
			</div>
		</>
	);
};
