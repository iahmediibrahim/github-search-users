import React from 'react'
import styled from 'styled-components'
import { useGithubContext } from '../context/context'
import { Pie3D } from './Charts'
// Pie3D, Column3D, Bar3D, Doughnut2D

const Repos = () => {
	const { repos } = useGithubContext()
	console.log(repos)
	const chartData = [
		{
			label: 'Venezuela',
			value: '290',
		},
		{
			label: 'Saudi',
			value: '260',
		},
		{
			label: 'Canada',
			value: '180',
		},
	]
	return (
		<section className='global-section'>
			<Wrapper className='section-center'>
				<Pie3D data={chartData} />
			</Wrapper>
		</section>
	)
}

const Wrapper = styled.div`
	display: grid;
	justify-items: center;
	gap: 2rem;
	@media (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 2fr 3fr;
	}

	div {
		width: 100% !important;
	}
	.fusioncharts-container {
		width: 100% !important;
	}
	svg {
		width: 100% !important;
		border-radius: var(--radius) !important;
	}
`

export default Repos
