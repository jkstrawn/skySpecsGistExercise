import { GistHeader } from "../model/gistModel";
import axios from "axios";

export default class GistController {
    static serverUrl = "http://127.0.0.1:5001/api";

    static async getFavoritedGists(): Promise<Array<GistHeader>> {
        return axios.get(`${this.serverUrl}/gist/favorites`)
            .then(function (response) {
                console.log(response.data);
                const data = response.data as GistHeader[];

                return data;
            });
    }

    static async getPublicGists(username: string): Promise<Array<GistHeader>> {
        return axios.get(`${this.serverUrl}/gist/forUser/${username}`)
            .then(function (response) {
                console.log(response.data);
                const data = response.data as GistHeader[];

                return data;
            });
    }

    static async getGistDetail(id: string): Promise<any> {
        return fetch(`${this.serverUrl}/gist/detail/${id}`)
            .then(async response => {
                const json = await response.json();

                console.log(json);

                return json;
            });
    }

    static async favoriteGist(gist: GistHeader): Promise<void> {
        axios.post(`${this.serverUrl}/gist/favorite`, {
            Id: gist.id,
            Created: gist.created,
            Description: gist.description,
        })
            .then(function (response) {
                console.log(response);
            });
    }

    static async unfavoriteGist(id: string): Promise<void> {
        axios.post(`${this.serverUrl}/gist/unfavorite/${id}`)
            .then(function (response) {
                console.log(response);
            });
    }
}