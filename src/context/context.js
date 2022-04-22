import React, { useContext, useState } from 'react'
import mockFollowers from './mockData.js/mockFollowers'
import mockRepos from './mockData.js/mockRepos'
import mockUser from './mockData.js/mockUser'
// import axios from 'axios';

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()
// Provider, consumer

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser)
	const [repos, setRepos] = useState(mockRepos)
	const [followers, setFollowers] = useState(mockFollowers)
	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
			}}>
			{children}
		</GithubContext.Provider>
	)
}
export const useGithubContext = () => useContext(GithubContext)
export { GithubProvider }
