import { Component } from "react";

export class ErrorBoundry extends Component {
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    state = {
        error: "",
        errorInfo: "",
        hasError: false,
    };

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return <></>;
        }
        return this.props.children;
    }
}
