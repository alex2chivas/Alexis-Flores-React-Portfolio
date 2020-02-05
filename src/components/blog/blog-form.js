import React, {Component} from 'react';
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import RichTextEditor from "../forms/rich-text-editor"

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      blog_status: "",
      content: "",
      featured_image:""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this)

    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);

    this.featuredImageRef = React.createRef()
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"// We will pass mock url so it does not upload the image automatically
    }
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    }
  }

  handleFeaturedImageDrop() {
    return {
      addedFile: file => this.setState({ featured_image: file })
    };
  }  

  // NoteTwo // This handleChange is a prop for rich-text-editor file
  handleRichTextEditorChange(content) {
    /* NoteTwo // If the key and the value of are the same name like in this case we do not need to use content:content*/
    this.setState({content })
  }

  buildForm () {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);
    formData.append("portfolio_blog[content]", this.state.content);

    if (this.state.featured_image) {
      formData.append(
        "portfolio_blog[featured_image]", 
        this.state.featured_image
      );
    }

    return formData;
  }

  // NoteOne // This is the function that post api and provides information for the parent and the grandparent data
  handleSubmit (event) {
    axios.post("https://alexisflores.devcamp.space/portfolio/portfolio_blogs", this.buildForm(),
    {
      withCredentials: true
    }).then(response => {

      if(this.state.featured_image){
        this.featuredImageRef.current.dropzone.removeAllfiles()        
      }

      this.setState({
        title: "",
        blog_status: "draft",
        content: "",
        featured_image: ""
      });

  
      this.props.handleSuccessFormSubmission(
        response.data.portfolio_blog
      ); // NoteOne // We are passing the reponse over to the parent component

    }).catch(error => {
      console.log("api error for blog modal", error)
    })

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

          <input
            type="text"
            onChange={this.handleChange}
            name="blog_status"
            placeholder="Blog status"
            value={this.state.blog_status}
          />        
        </div>

        <div className="one-column">
          <RichTextEditor
            handleRichTextEditorChange={this.handleRichTextEditorChange}
          />
        </div>

        <div className="image-uploaders">
          <DropzoneComponent
          // NoteThree // It is called eventHandlers because the component DropzoneComponent has a vast list of functions
          // for exmaple is - addFile this is located inside the handleFeaturedImageDrop
            ref={this.featuredImageRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleFeaturedImageDrop()}          
          >
            <div className="dz-message">Featured Image</div> 
          </DropzoneComponent>
        </div>

        <button className="btn">Save</button>
      </form>    );
  }
}