import React, {Component} from 'react';
import axios from "axios";

import RichTextEditor from "../forms/rich-text-editor"

export default class BlogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      blog_status: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  buildForm () {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);

    return formData;
  }

  // NoteOne // This is the function that post api and provides information for the parent and the grandparent data
  handleSubmit (event) {
    axios.post("https://alexisflores.devcamp.space/portfolio/portfolio_blogs", this.buildForm(),
    {
      withCredentials: true
    }).then(response => {
      this.props.handleSuccessFormSubmission(response.data.portfolio_blog); // NoteOne // We are passing the reponse over to the parent component
    }).catch(error => {
      console.log("api error for blog modal", error)
    })

    this.setState({
      title: "",
      blog_status: ""
    });

    event.preventDefault();
  }

  handleChange(event) { // Note // Takes in an event automatically in this case
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            onChange={this.handleChange}
            name="title"
            placeholder="Blog Title"
            value={this.state.title}
          />

          <select
            type="text" onChange={this.handleChange} name="blog_status" value={this.state.blog_status}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
          </select>
        </div>
        
        <div className="one-column">
          <RichTextEditor/>
        </div>

        <button className="btn">Save</button>
      </form>    );
  }
}