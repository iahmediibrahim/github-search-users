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
	// check rate
	const checkRequests = () => {
		axios(`${rootUrl}/rate_limit`)
			.then(
				({
					data: {
						rate: { remaining },
					},
				}) => {
					console.log(remaining)
					setRequests(remaining)
					if (remaining === 0) {
						// throw an error
					}
				},
			)
			.catch((err) => console.log(err))
	}
	// error
	useEffect(checkRequests, [])

	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requests,
			}}>
			{children}
		</GithubContext.Provider>
	)
}
export const useGithubContext = () => useContext(GithubContext)
export { GithubProvider }
