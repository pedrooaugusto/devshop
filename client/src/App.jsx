import React from 'react';
import Main from './scene/Main';
import BuyDevs from './scene/BuyDevs';
import BuyHistory from './scene/BuyHistory';
import {Route, Switch, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
const history = createBrowserHistory({});

function App(props) {
	return (
		<Router history = {history}>
			<Switch>
				<Route exact path="/">
					<Main />
				</Route>
				<Route path = "/buy">
					<BuyDevs {...props.buyDevs}/>
				</Route>
				<Route path = "/history">
					<BuyHistory {...props.salesHistory}/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
