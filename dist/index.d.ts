import React from 'react';

export function setPusherClient(apiKey: string, opts: object);

interface Props {
  channel: string;
  events: string[];
  onUpdate: (event: string, payload: any) => void;
}

export default class PusherSubscription extends React.Component<Props> {

}
