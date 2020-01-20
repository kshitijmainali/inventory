import React from 'react';
import './App.css';

import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Stock from './components/stocks/Stock';
import NewStock from './components/stocks/NewStock';
import EditStock from './components/stocks/EditStock';
import Category from './components/categories/Category';
import NewCategory from './components/categories/NewCategory';
import EditCategory from './components/categories/EditCategory';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div id='page-top'>
				<div id='wrapper'>
					<Sidebar />
					<div id='content-wrapper' className='d-flex flex-column'>
						<Navbar />
						<div className='container-fluid'>
							<Switch>
								<Route path='/' exact component={Stock} />
								<Route path='/stocks' exact component={Stock} />
								<Route path='/stocks/new' component={NewStock} />
								<Route path='/stock/edit/:productId' component={EditStock} />
								<Route path='/categories' exact component={Category} />
								<Route path='/categories/new' component={NewCategory} />
								<Route path='/category/edit/:catId' component={EditCategory} />
							</Switch>
						</div>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default App;
