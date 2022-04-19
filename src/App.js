import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Dashboard, Error, Login } from './pages'
// PrivateRoute,
// 	AuthWrapper,
function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact>
					<Dashboard />
				</Route>
				<Route path='login'>
					<Login />
				</Route>
				<Route path='*'>
					<Error />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
