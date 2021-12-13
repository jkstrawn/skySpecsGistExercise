import * as React from "react";
import { render } from "react-dom";
import App from "./userInterface/components/app";
import {
    BrowserRouter as Router,
} from "react-router-dom";

render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// Hot module replacement
if (process.env.NODE_ENV == 'development' && module.hot) module.hot.accept();