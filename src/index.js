import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { GithubProvider } from './context/context'
import './index.css'
import * as serviceWorker from './serviceWorker'
// import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
	<React.StrictMode>
		<GithubProvider>
			<App />
		</GithubProvider>
	</React.StrictMode>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
