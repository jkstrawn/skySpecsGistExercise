import { observable, action, makeObservable, computed } from 'mobx';
import { RootStore } from './rootStore';

export class FutureStore {
    private rootStore: RootStore;

    @observable name = "future store";

    constructor(rootStore?: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this);
    }
}