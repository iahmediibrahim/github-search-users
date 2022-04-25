import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthWrapper, Dashboard, Error, Login, PrivateRoute } from './pages'

function App() {
	return (
		<AuthWrapper>
			<Router>
				<Switch>
					<PrivateRoute path='/' exact>
						<Dashboard />
					</PrivateRoute>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='*'>
						<Error />
					</Route>
				</Switch>
			</Router>
		</AuthWrapper>
	)
}

export default App
