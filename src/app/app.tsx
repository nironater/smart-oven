import './app.less';

import * as React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { IAppStore } from '../models/app-model';
import { Oven } from './components/oven-parts/oven/oven';

type AppProps = {
    appStore: IAppStore
}

@observer
export class App extends React.Component<AppProps, { localArr: any[] }> {
    constructor(props: AppProps) {
        super(props);
        props.appStore.init();
    }

    render() {
        const { appStore } = this.props;

        return (
            <div className="app">
                <Oven appStore={appStore} />
                <DevTools />
                <div className="credits">
                    Thanks to <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>
                </div>
            </div>
        );
    }
};