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
		setLoading(true)
		const resp = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(err))
		if (resp) {
			setGithubUser(resp.data)
			const { login, followers_url } = resp.data
			await Promise.allSettled([
				axios(`${rootUrl}/users/${login}/repos?per_page=100`),
				axios(`${followers_url}?per_page=100`),
			])
				.then((results) => {
					const [repos, followers] = results
					const status = 'fulfilled'
					if (repos.status === status) setRepos(repos.value.data)
					if (followers.status === status) setFollowers(followers.value.data)
				})
				.catch((err) => console.log(err))
		} else {
			toggleError(true, 'there is no user with that username')
		}
		checkRequests()
		setLoading(false)
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
				loading,
			}}>
			{children}
		</GithubContext.Provider>
	)
}
export const useGithubContext = () => useContext(GithubContext)
export { GithubProvider }
