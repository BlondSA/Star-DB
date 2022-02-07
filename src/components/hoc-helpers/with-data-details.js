import React, { Component } from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error-message/error-message";

const withData = (View, getData) => {
    return class extends Component {
        state = {
            data: {},
            error: false,
            loading: true,
        };

        componentDidMount = () => {
            this.updateState();
        };

        onListLoaded = (data) => {
            this.setState({ data: data, loading: false, error: false });
        };

        onLoad = () => {
            this.setState({ loading: true });
        };

        onError = () => {
            this.setState({ error: true, loading: false });
        };

        updateState = () => {
            this.onLoad();
            getData().then(this.onListLoaded).catch(this.onError);
        };

        render() {
            const { data, loading, error } = this.state;
            const { onItemSelected, children } = this.props;
            const spinner = loading ? <Spinner /> : null;
            const errorMessage = error ? <ErrorMessage /> : null;
            const content =
                !loading && !error ? (
                    <ContentView
                        data={data}
                        onItemSelected={onItemSelected}
                        children={children}
                    />
                ) : null;
            return (
                <View
                    {...this.props}
                    spiner={spinner}
                    loading={loading}
                    errorMessage={errorMessage}
                    content={content}
                />
            );
        }
    };
};

const ContentView = (props) => {
    const { data, onItemSelected, children } = props;
    return data.map((item) => {
        const label = children(item);
        const { id } = item;
        return (
            <li
                className="list-group-item"
                key={id}
                onClick={() => onItemSelected(id)}
            >
                {label}
            </li>
        );
    });
};

export default withData;
