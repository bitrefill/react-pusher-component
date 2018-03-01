import React from 'react';
import PropTypes from 'prop-types';

import ErrorBoundary from './error-boundary';
import Subscription, { setClient } from './subscription';

export const setPusherClient = setClient;

export default function PusherSubscription(props) {
  return (
    <ErrorBoundary onError={props.onError}>
      <Subscription {...props} />
    </ErrorBoundary>
  );
}

PusherSubscription.propTypes = {
  onError: PropTypes.func,
};
