import GistController from '@src/scripts/controllers/gistController';
import { GistHeader } from '@src/scripts/model/gistModel';
import { observable, action, makeObservable } from 'mobx';
import { RootStore } from './rootStore';

export class GistStore {
    private rootStore: RootStore;

    @observable searchName: string = "";
    @observable gists: GistHeader[] = [];
    @observable favoritedGists: GistHeader[] = [];
    @observable loadingList: boolean = false;
    @observable loadingDetail: boolean = false;

    constructor(rootStore?: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this);
    }

    @action async fetchFavoritedGists() {
        this.favoritedGists = await GistController.getFavoritedGists();
    }

    @action fetchPublicGists(username: string) {
        this.gists = [];
        this.searchName = username;
        this.loadingList = true;

        GistController.getPublicGists(this.searchName).then(gists => {
            this.gists = gists;
            this.loadingList = false;
        });
    }

    @action favorite(gist: GistHeader) {
        GistController.favoriteGist(gist);

        this.favoritedGists = [...this.favoritedGists, gist];
    }

    @action unfavorite(id: string) {
        GistController.unfavoriteGist(id);

        this.favoritedGists = this.favoritedGists.filter(x => x.id != id);
    }
}