import React, { Component } from "react";
import axios from 'axios';

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.slug, // Note // We are calling props from the route not from the blog file. 
      blogItem: {}
    }
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
    const {title, 
      content, 
      featured_image_url, 
      blog_status} = this.state.blogItem

    return (
      <div className="blog-container">
        <div className='content-container'>  
          <div className="title">
            <h1>{title}</h1>
          </div>
          
          <div className='featured-image-wrapper'>
            <img src={featured_image_url}/>
          </div>

          <div className='content'>
            {content}
          </div>
        </div>  
      </div>
    );
  }
}