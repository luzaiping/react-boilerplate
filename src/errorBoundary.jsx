import { React } from 'react';
import PropTypes from 'prop-types';

/**
 * 渣渣，Hook 目前还不支持 componentDidCatch 和 getSnapshotBeforeUpdate
 * 因此将 ErrorBoundary 用在 Hook， Hook 出现错误，错误是不会被 catch
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    // here just return partical state object
    return { hasError: true };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service.
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Somehing went wrong</h1>;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any
};

export default ErrorBoundary;
