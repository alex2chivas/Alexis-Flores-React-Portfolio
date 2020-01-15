import React, {Component} from 'react'
import axios from 'axios';

import PortfolioSideBarList from "./portfolio-sidebar-list"
import PortfolioForm from "./portfolio-form"

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: []
    }

    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
  }

  handleSuccessfulFormSubmission(portfolioItem) {
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems) //concat will push to the very top
    })
  }

  handleFormSubmissionError (error) {
    console.log("handleFormSubmissionError error", error)
  }

  getPortfolioitems() {
    axios
    .get("https://alexisflores.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", // NOTES // it has ? for different parameters, optional parameters differ per API
    {
      withCredentials: true
    }).then(response => {
      this.setState({
        portfolioItems: [...response.data.portfolio_items]
      })
    }).catch(error => {
      console.log("error in getPortfolioitems", error)
    })
  }

  componentDidMount() {
    this.getPortfolioitems();
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">

        <div className="left-column">
          <PortfolioForm 
            handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
          />
        </div>

        <div className="right-column">          
            <PortfolioSideBarList data={this.state.portfolioItems}/>
        </div>

      </div>

    );
  }
}