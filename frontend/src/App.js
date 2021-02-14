import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import history from './services/history';

import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<Router history={history}>
			<Routes />

			<ToastContainer autoClose={3000} />
		</Router>
	);
}

export default App;
