import { Typography } from "@mui/material";
import GistController from "@src/scripts/controllers/gistController";
import { GistDetail } from "@src/scripts/model/gistModel";
import Helper from "@src/userInterface/helper";
import React from "react";
import { Component } from "react";
import { RouteComponentProps } from "react-router";
import Common from "../common";

interface Props {
    id: string;
}

interface State {
    data?: GistDetail;
}

export default class GistDetailPage extends Component<RouteComponentProps<Props>, State> {

    constructor(props: Readonly<RouteComponentProps<Props>>) {
        super(props);

        this.state = {

        };
    }

    async componentDidMount() {
        const data = await GistController.getGistDetail(this.props.match.params.id);
        this.setState({ data });
    }

    render() {
        if (!this.state.data) {
            return <div className="loader">{Common.loader}</div>;
        }

        return <div>
            <Typography variant="h6" component="div">
                Gist Detail for {this.props.match.params.id}
            </Typography>

            <div>{Helper.formatDate(this.state.data.created)}</div>
            {this.state.data.description ? this.state.data.description : "[no description]"}
            <div>
                Files:
                {this.state.data.fileNames.map(filename => {
                    return <div key={filename}>{filename}</div>
                })}
            </div>
        </div>
    }
}