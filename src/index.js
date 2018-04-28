import { Component } from 'react';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';

export let pusherClient;

function getExistingInstance(apiKey) {
  if (typeof window === 'undefined') return;

  const existingInstances =
    (window && window.Pusher && window.Pusher.instances) || [];

  return (
    window.BITREFILL__PUSHER || existingInstances.find(x => x.key === apiKey)
  );
}

function setInstance(_pusherClient) {
  pusherClient = _pusherClient;
  if (typeof window !== 'undefined') window.BITREFILL__PUSHER = _pusherClient;
}

function createPusherClient(apiKey, opts = {}) {
  const existingInstance = getExistingInstance(apiKey);

  setInstance(
    existingInstance ||
      new Pusher(apiKey, {
        encrypted: true,
        authTransport: 'ajax',
        ...opts,
      })
  );
}

export default class PusherSubscription extends Component {
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

    createPusherClient(apiKey, opts);
    this.bindPusherEvents(channel, events);
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
    pusherClient && this.unbindPusherEvents();
  }

  bindPusherEvents(channel, events) {
    const { onUpdate } = this.props;
    this.channelInstance = pusherClient.subscribe(channel);

    events.forEach(event =>
      this.channelInstance.bind(event, payload => onUpdate(event, payload))
    );
  }

  unbindPusherEvents() {
    const { channel } = this.props;
    this.channelInstance.unbind();
    pusherClient.unsubscribe(channel);
  }

  render() {
    return null;
  }
}
