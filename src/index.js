import React from 'react';
import PropTypes from 'prop-types';

let pusherClient

export function setPusherClient(newClient) {
  pusherClient = (window && window.Pusher) || newClient || {
    subscribe: () => console.warn('no pusherClient'),
    unsubscribe: () => console.warn('no pusherClient')
  };
}

class PusherSubscription extends React.Component {

  constructor(props) {
    super(props);
    if (!pusherClient) {
      console.warn('setup pusher client using setPusherClient()');
    }

    this.bindPusherEvents(props.channel, props.events);
  }

  componentWillReceiveProps({ channel: newChannel, events: newEvents }) {
    const { channel, events } = this.props;
    if (channel === newChannel && events === newEvents) {
      return;
    }

    this.unbindPusherEvents(channel);
    this.bindPusherEvents(newChannel, newEvents);
  }

  componentWillUnmount() {
    this.unbindPusherEvents(this.props.channel);
  }

  componentDidCatch(err, info) {
    console.error('react-pusher', err)
    console.error('react-pusher', info)
  }

  unbindPusherEvents(channel) {
    this.channelInstance && this.channelInstance.unbind();
    pusherClient && pusherClient.unsubscribe(channel);
  }

  bindPusherEvents(channel, events) {
    this.channelInstance = pusherClient && pusherClient.subscribe(channel);

    events.forEach(event =>
      this.channelInstance && this.channelInstance.bind(event, payload =>
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
