import { FutureStore } from './futureStore';
import { GistStore } from './gistStore';

export class RootStore {
    futureStore: FutureStore;
    gistStore: GistStore;

    constructor() {
        this.futureStore = new FutureStore();
        this.gistStore = new GistStore(this);
    }
}