import React from 'react';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';

let pusherClient

export function setPusherClient(apiKey, opts = {}) {
  const existingInstances = (window && window.Pusher && window.Pusher.instances) || []
  const existingInstance = existingInstances.find(instance => instance.key === apiKey)

  pusherClient = existingInstance || new Pusher(apiKey, Object.assign({}, {
    encrypted: true,
  }, opts))
}

class PusherSubscription extends React.Component {
  constructor(props) {
    super(props);

    if (pusherClient) {
      this.bindPusherEvents(props.channel, props.events);
    } else {
      console.warn('setup pusher client using setPusherClient()');
    }
  }

  componentWillReceiveProps({ channel: newChannel, events: newEvents }) {
    const { channel, events } = this.props;
    if (channel === newChannel && events === newEvents) return;

    if (pusherClient) {
      this.unbindPusherEvents(channel);
      this.bindPusherEvents(newChannel, newEvents);
    }
  }

  componentWillUnmount() {
    pusherClient && this.unbindPusherEvents(this.props.channel);
  }

  unbindPusherEvents(channel) {
    this.channelInstance.unbind();
    pusherClient.unsubscribe(channel);
  }

  bindPusherEvents(channel, events) {
    this.channelInstance = pusherClient.subscribe(channel);

    events.forEach(event =>
      this.channelInstance.bind(event, payload =>
        this.props.onUpdate(event, payload)
      )
    );
  }

  render() {
    return null;
  }
}

PusherSubscription.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  channel: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired
};

export default PusherSubscription;
