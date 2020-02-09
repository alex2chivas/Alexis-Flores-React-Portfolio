import React, { Component } from "react";
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";
import { withRouter } from "react-router";

import BlogFeaturedImage from "../blog/blog-featured.image";

class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.slug, // Note // We are calling props from the route not from the blog file. 
      blogItem: {},
    }

    this.clickHandlerPrevPage = this.clickHandlerPrevPage.bind(this);
  }

  //NoteThree // using higher order function
  clickHandlerPrevPage() {
    this.props.history.goBack()
  }

  getBlogItem() {
    axios.get(`https://alexisflores.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
    ).then(response => {
      this.setState({
        blogItem: response.data.portfolio_blog
      })
    }).catch(error => {
      console.log("getBlogItem error", error);
    })
  }

  componentDidMount() {
    this.getBlogItem();
  }

  render() {
    const {
      title, 
      content, 
      featured_image_url, 
      blog_status} = this.state.blogItem

    return (
      <div className="blog-container">
        <div className='content-container'>  
          <div className="title">
            <a onClick={this.clickHandlerPrevPage}>{title}</a>
          </div>

          <BlogFeaturedImage img={featured_image_url}/>

          <div className='content'>
            {ReactHtmlParser(content)}
          </div>
        </div>  
      </div>
    );
  }
}

export default withRouter(BlogDetail)

