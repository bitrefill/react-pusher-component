import React from 'react';
import Pusher from 'pusher-js';

export function setPusherClient(client: Pusher);

interface Props {
  channel: string;
  events: string[];
  onUpdate: (event: string, payload: any) => void;
}

export default class PusherSubscription extends React.Component<Props> {

}