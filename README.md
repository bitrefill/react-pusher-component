# react-pusher

```javascript
// Use the pusher component

import Pusher from '@bitrefill/react-pusher';

function SomeComponent() {
  return (
    <Pusher
      apiKey={PUSHER_API_KEY}
      opts={{additional: 'options'}}
      channel="channel"
      events={["event"]}
      onUpdate={(event, payload) => {
        // ...
      }}
    />
  )
}
```

```javascript
// Load the component async

import React from 'react';
import Loadable from 'react-loadable';

const LoadablePusher = Loadable({
  loader: () => import('@bitrefill/react-pusher'),
  loading: null,
});

function SomeComponent() {
  return (
    <LoadablePusher
      apiKey={PUSHER_API_KEY}
      opts={{ additional: 'options' }}
      channel="channel"
      events={["event"]}
      onUpdate={(event, payload) => {
        // ...
      }}
    />
  )
}
```

```javascript
// Access the pusher instance

import { getPusherClient } from '@bitrefill/react-pusher';

const pusher = getPusherClient(PUSHER_API_KEY, { additional: 'options' });
const channel = pusher.subscribe('someChannel');
// ...
```

```javascript
// Access the pusher instance async

import('@bitrefill/react-pusher').then(({ getPusherClient }) => {
  const pusher = getPusherClient(PUSHER_API_KEY, { additional: 'options' });
  const channel = pusher.subscribe('someChannel');
  // ...
})
// ...
```

## PropTypes

| Name              | Type
| ----              | ----
| `apiKey`          | `PropTypes.string.isRequired`
| `opts`            | `PropTypes.object`
| `channel`         | `PropTypes.string.isRequired`
| `events`          | `PropTypes.array.isRequired`
| `onUpdate`        | `PropTypes.func.isRequired`
