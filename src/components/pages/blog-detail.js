import React, { Component } from "react";
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";
import { withRouter } from "react-router";

import BlogForm from "../blog/blog-form"
import BlogFeaturedImage from "../blog/blog-featured.image";

class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.slug, // Note // We are calling props from the route not from the blog file. 
      blogItem: {},
      editMode: false
    }

    this.handleEditClick = this.handleEditClick.bind(this);
  }

  //NoteThree // using higher order function
  handleEditClick() {
    console.log("handle edit click")
    this.setState({
      editMode: true
    })
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

    const contentManager = () => {
      if(this.state.editMode) {
        return <BlogForm />
      } else {
        return (
          <div className='content-container'>  
            <h1 onClick={this.handleEditClick}>{title}</h1>

            <BlogFeaturedImage img={featured_image_url}/>

            <div className='content'>
              {ReactHtmlParser(content)}
            </div>
          </div>
        );          
      };
    };

    return (
      <div className="blog-container">
        {contentManager()}
      </div>
    );
  }
}

export default  BlogDetail

