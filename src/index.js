import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';

function createPusherClient(apiKey, opts = {}) {
  const existingInstances =
    (window && window.Pusher && window.Pusher.instances) || [];

  const existingInstance = existingInstances.find(x => x.key === apiKey);

  if (existingInstance) {
    console.log('Found an existing Pusher instance', existingInstance);
  }

  return (
    existingInstance ||
    new Pusher(apiKey, {
      encrypted: true,
      authTransport: 'ajax',
      ...opts,
    })
  );
}

export default class PusherSubscription extends PureComponent {
  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    opts: PropTypes.object,
    onUpdate: PropTypes.func.isRequired,
    channel: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
    children: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { apiKey, channel, events, opts } = this.props;

    this.pusherClient = createPusherClient(apiKey, opts);
    this.bindPusherEvents(channel, events);
  }

  componentWillReceiveProps({ channel: newChannel, events: newEvents }) {
    const { channel, events } = this.props;
    if (channel === newChannel && events === newEvents) return;

    if (this.pusherClient) {
      this.unbindPusherEvents(channel);
      this.bindPusherEvents(newChannel, newEvents);
    }
  }

  componentWillUnmount() {
    this.pusherClient && this.unbindPusherEvents();
  }

  bindPusherEvents(channel, events) {
    const { onUpdate } = this.props;
    this.channelInstance = this.pusherClient.subscribe(channel);

    events.forEach(event =>
      this.channelInstance.bind(event, payload => onUpdate(event, payload))
    );
  }

  unbindPusherEvents() {
    const { channel } = this.props;
    this.channelInstance.unbind();
    this.pusherClient.unsubscribe(channel);
  }

  render() {
    return <h1>{'PUSHER is loaded!'}</h1>;
  }
}
