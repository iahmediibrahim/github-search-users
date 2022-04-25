import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import mockFollowers from './mockData.js/mockFollowers'
import mockRepos from './mockData.js/mockRepos'
import mockUser from './mockData.js/mockUser'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()
// Provider, consumer

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser)
	const [repos, setRepos] = useState(mockRepos)
	const [followers, setFollowers] = useState(mockFollowers)
	// request loading
	const [requests, setRequests] = useState(0)
	const [loading, setLoading] = useState(false)
	// error
	const [error, setError] = useState({
		show: false,
		message: '',
	})
	const searchGithubUser = async (user) => {
		toggleError()
		const resp = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(err))
		if (resp) {
			setGithubUser(resp.data)
		} else {
			toggleError(true, 'there is no user with that username')
		}
	}
	// check rate
	const checkRequests = () => {
		axios(`${rootUrl}/rate_limit`)
			.then(
				({
					data: {
						rate: { remaining },
					},
				}) => {
					setRequests(remaining)
					if (remaining === 0) {
						// throw an error
						toggleError(true, 'sorry, you have exceeded your hourly rate limit!')
					}
				},
			)
			.catch((err) => console.log(err))
	}
	function toggleError(show = false, message = '') {
		setError({ show, message })
	}
	useEffect(checkRequests, [])

	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requests,
				error,
				searchGithubUser,
			}}>
			{children}
		</GithubContext.Provider>
	)
}
export const useGithubContext = () => useContext(GithubContext)
export { GithubProvider }
