
import React from "react";
import GistList from "../gist/gistList";
import Button from '@mui/material/Button';
import { TextField, Typography } from "@mui/material";
import "./home.less";
import { observer } from "mobx-react";
import ComponentWithStore from "@src/userInterface/framework/componentWithStore";
import { RouteComponentProps } from "react-router";

interface State {
    searchName: string;
}

@observer
export default class HomePage extends ComponentWithStore<RouteComponentProps, State> {

    constructor(props: RouteComponentProps<{}>) {
        super(props);

        this.state = {
            searchName: "",
        };
    }

    componentDidMount() {
        this.setState({ searchName: this.gistStore.searchName });
    }

    render() {
        return <div className="home">
            <Typography className="title" variant="h5" component="div">
                Welcome to Gist Viewer
            </Typography>

            <div className="search-bar">
                <TextField id="standard-basic" label="Enter Username" variant="standard" onChange={(e) => this.onChangeName(e.target.value)} onKeyPress={(e) => this.onKeyPress(e.key)} value={this.state.searchName} />
                <Button variant="contained" onClick={() => this.submitName()}>Find Gists</Button>
            </div>
            <GistList {...this.props} />
        </div>
    }

    onKeyPress(key: string) {
        if (key === 'Enter') {
            this.submitName();
        }
    }

    onChangeName(name: string) {
        this.setState({ searchName: name });
    }

    async submitName() {
        if (!this.state.searchName) return;

        this.gistStore.fetchPublicGists(this.state.searchName);
    }
}