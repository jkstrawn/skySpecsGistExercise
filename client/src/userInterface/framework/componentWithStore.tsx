import React, { ComponentType } from 'react';
import { FutureStore } from '../stores/futureStore';
import { RootStore } from '../stores/rootStore';
import { GistStore } from '../stores/gistStore';
import { StoreContext } from './storeProvider';

export default class ComponentWithStore<Props, State> extends React.Component<Props, State> {
    static contextType = StoreContext;

    get gistStore(): GistStore {
        return (this.context as RootStore).gistStore;
    }
    get futureStore(): FutureStore {
        return (this.context as RootStore).futureStore;
    }
}