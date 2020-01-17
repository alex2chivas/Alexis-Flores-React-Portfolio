import React, {Component} from 'react'
import axios from 'axios';

import PortfolioSideBarList from "./portfolio-sidebar-list"
import PortfolioForm from "./portfolio-form"

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: [],
      portfolioToEdit: {}
    }

    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.ClearPortfolioToEdit = this.ClearPortfolioToEdit.bind(this)

  }

  ClearPortfolioToEdit() {
    this.setState({
      portfolioToEdit: {}
    });
  }

  handleEditClick(portfolioItem){
    this.setState({
      portfolioToEdit: portfolioItem
    });
  }

  handleDeleteClick(portfolioItem) {
    axios
    .delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, 
    {
      withCredentials: true
    }).then(response => {
      this.setState({
        portfolioItems: this.state.portfolioItems.filter(item => {
          return item.id !== portfolioItem.id;
        }) //Note //filter() function lets you iterate each item in the collection and keep what we need 
      })

      return response.data
    }).catch(error => {
      console.log("handleDeleteClick error", error)
    })
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
            ClearPortfolioToEdit = {this.ClearPortfolioToEdit}
            portfolioToEdit={this.state.portfolioToEdit}
          />
        </div>

        <div className="right-column">          
            <PortfolioSideBarList 
              handleDeleteClick = {this.handleDeleteClick}
              data={this.state.portfolioItems}
              handleEditClick={this.handleEditClick}
            />
        </div>

      </div>

    );
  }
}