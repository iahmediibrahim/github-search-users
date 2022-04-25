import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {
	const { isAuthenticated, user } = useAuth0()
	const isUser = isAuthenticated && user
	if (!isUser) return <Navigate to='/login' />
	return children
}
export default PrivateRoute
