import React from 'react';

export function getPusherClient(apiKey: string, opts: object);

interface Props {
  apiKey: string;
  channel: string;
  events: string[];
  onUpdate: (event: string, payload: any) => void;
}

export default class PusherSubscription extends React.Component<Props> {

}
