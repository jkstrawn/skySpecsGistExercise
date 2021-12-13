import * as React from "react";
import { hot } from "react-hot-loader";
import HomePage from "./home/homePage";
import { Route, Switch } from "react-router-dom";
import Header from "./header/header";
import GistDetailPage from "./gist/gistDetailPage";
import { observer } from "mobx-react";
import ComponentWithStore from "../framework/componentWithStore";
import "./app.less";
import FavoritesPage from "./favorites/favoritesPage";

@observer
class App extends ComponentWithStore<{}, {}> {

	async componentDidMount() {
		this.gistStore.fetchFavoritedGists();
		// this.gistStore.fetchPublicGists("this.state.name");
	}

	public render() {
		return <>
			<Header />
			<div className="app">
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/favorites' component={FavoritesPage} />
					<Route path='/gist/:id' component={GistDetailPage} />
				</Switch>
			</div>
		</>
	}
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
