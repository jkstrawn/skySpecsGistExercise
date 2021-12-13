import { Button, Typography } from "@mui/material";
import React from "react";
import { Component } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import "./header.less";

class Header extends Component<RouteComponentProps, {}> {

    render() {
        return <div className="header">
            <Button variant="outlined" onClick={() => this.back()}>Back</Button>
            <Link to="/" className="header-item">
                <Typography variant="body1">
                    Home
                </Typography>
            </Link>
            <Link to="/favorites" className="header-item">
                <Typography variant="body1">
                    Favorites
                </Typography>
            </Link>
        </div>
    }

    back() {
        this.props.history.goBack();
    }
}

export default withRouter(Header);