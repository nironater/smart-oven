import './app.less';

import * as React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { IAppStore } from '../models/app-model';
import { Oven } from './components/oven-parts/oven/oven';

interface AppProps {
    appStore: IAppStore
}

@observer
export class App extends React.Component<AppProps> {
    componentDidMount() {
        this.props.appStore.init();
    }

    render() {
        const { appStore } = this.props;

        return (
            <div className="app">
                {appStore.isLoading ?
                    <div>Loading...</div>
                    : this.renderOven()
                }
                <DevTools />
            </div>
        );
    }

    renderOven() {
        const { appStore } = this.props;

        return (
            <>
                <div className="configuration-buttons">
                    <button onClick={() => appStore.init("fast")}>Fast</button>
                    <button onClick={() => appStore.init("slow")}>Slow</button>
                </div>
                <Oven appStore={appStore} />
                <div className="credits">
                    Thanks to <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>
                </div>
            </>
        );
    }
};