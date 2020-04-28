import React, { Component } from 'react';
import axios from 'axios';

import PortfolioItems from './portfolio-item';

export default class PortfolioContainer extends Component {
	constructor() {
		super();

		this.state = {
			pageTitle: 'Welcome to my portfolio',
			isLoading: false,
			data: []
		};

		this.handleFilter = this.handleFilter.bind(this);
	}

	handleFilter(filter) {
		filter === 'CLEAR_FILTERS' ? this.getPortfolioItems() : this.getPortfolioItems(filter);
	}

	getPortfolioItems(filter = null) {
		axios
			.get('https://alexisflores.devcamp.space/portfolio/portfolio_items')
			.then(response => {
				if (filter) {
					this.setState({
						data: response.data.portfolio_items.filter(item => {
							return item.category === filter;
						})
					});
				} else {
					this.setState({
						data: response.data.portfolio_items
					});
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	portfolioItems() {
		//Data that we'll need:
		// - background image:thumb_image_url
		// - logo: logo_url
		// - description: description
		// - id: id
		// ---- Usable code to find certain things
		// Object.keys(item)
		return this.state.data.map(item => {
			return <PortfolioItems key={item.id} item={item} />;
		});
	}

	componentDidMount() {
		this.getPortfolioItems();
	}

	render() {
		if (this.state.isLoading) {
			return <div>Loading...</div>;
		}
		return (
			<div className='homepage-wrapper'>
				<div className='filter-links'>
					<button className='btn' onClick={() => this.handleFilter('Javascript')}>
						Javascript
					</button>
					<button className='btn' onClick={() => this.handleFilter('React')}>
						React
					</button>
					<button className='btn' onClick={() => this.handleFilter('React Redux')}>
						React Redux
					</button>
					<button className='btn' onClick={() => this.handleFilter('CLEAR_FILTERS')}>
						ALL
					</button>
				</div>
				<div className='portfolio-items-wrapper'>{this.portfolioItems()}</div>
			</div>
		);
	}
}

// State needs a class base component
// Lifecycle hooks needs a class base component

//constructor is built in
