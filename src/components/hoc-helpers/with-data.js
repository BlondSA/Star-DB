import React from "react";
import Spinner from "../spinner";
import ErrorMessage from "../error-message/error-message";

const withData = (View) => {
    return class extends React.Component {
        state = {
            data: null,
            error: false,
            loading: true,
        };

        componentDidUpdate = (prevProps) => {
            if (this.props.getData !== prevProps.getData) {
                this.updateState();
            }
        };

        componentDidMount = () => {
            this.updateState();
        };

        onDataLoaded = (data) => {
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
            this.props.getData().then(this.onDataLoaded).catch(this.onError);
        };

        render() {
            const { data, loading, error } = this.state;

            if (loading) {
                return <Spinner />;
            }

            if (error) {
                return <ErrorMessage />;
            }

            return <View data={data} {...this.props} />;
        }
    };
};

export default withData;
