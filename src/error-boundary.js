import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends PureComponent {
  static propTypes = {
    onError: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    onError: () => {},
  };

  componentDidCatch(err, info) {
    this.props.onError(err, info);
  }

  render() {
    return this.props.children;
  }
}
