import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';

import { App } from './app/app';
import appState from './stores/app';

useStrict(true);

ReactDOM.render(<App appStore={appState} />, document.getElementById('root'));