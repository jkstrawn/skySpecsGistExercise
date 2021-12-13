import { Button, Typography } from "@mui/material";
import ComponentWithStore from "@src/userInterface/framework/componentWithStore";
import Helper from "@src/userInterface/helper";
import { observer } from "mobx-react";
import React from "react";
import { RouteComponentProps } from "react-router";
import Common from "../common";
import "./gist.less";


@observer
export default class GistList extends ComponentWithStore<RouteComponentProps, {}> {

    render() {
        if (this.gistStore.loadingList) {
            return <div className="loader">
                {Common.loader}
            </div>
        }

        if (!this.gistStore.gists.length) {
            return <></>
        }

        return <div className="home-gist-list">
            <Typography variant="h6" component="div">
                Public Gists
            </Typography>

            {/* this could be refactored to a shared component */}
            {this.gistStore.gists.map(gist => {
                return <div className="gist-item" key={gist.id}>
                    <div className="gist-item-detail" onClick={() => this.viewGist(gist.id)}>
                        <div>{Helper.formatDate(gist.created)}</div>
                        {gist.description ? gist.description : "[no description]"}
                    </div>
                    {this.gistStore.favoritedGists.some(x => x.id == gist.id)
                        ? <Button variant="contained" onClick={() => this.gistStore.unfavorite(gist.id)}>Unfavorite</Button>
                        : <Button variant="outlined" onClick={() => this.gistStore.favorite(gist)}>Favorite</Button>
                    }
                </div>
            })}
        </div>
    }

    viewGist(id: string) {
        console.log(id);

        this.props.history.push(`/gist/${id}`);
    }
}