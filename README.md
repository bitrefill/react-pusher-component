# react-pusher

```javascript
// Setup pusher

import Pusher from 'pusher-js';
import { setPusherClient } from 'react-pusher';

setPusherClient('key', {
  somePusherOption: true
}));
```

```javascript
// Use the pusher component

import PusherSubscription from 'react-pusher';

const App = () => {
  return (
    <PusherSubscription
      channel="channel"
      events={["event"]}
      onUpdate={(event, payload) => {
        // ...
      }}
    />
  )
}
```

## PropTypes

| Name              | Type
| ----              | ----
| `channel`         | `PropTypes.string.isRequired`
| `events`          | `PropTypes.array.isRequired`
| `onUpdate`        | `PropTypes.func.isRequired`
