import React, { Component} from "react";
import axios from "axios"
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name:"",
      description: "",
      category: "eCommerce",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: ""
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleThumbDrop = this.handleThumbDrop.bind(this);  
    this.handleBannerDrop = this.handleBannerDrop.bind(this);  
    this.handleLogoDrop = this.handleLogoDrop.bind(this); 
    
    this.thumbRef = React.createRef(); //Note // This will interact with the actual DOM and not the virtual DOM. Lets you grab in item by calling React.creatRef();
    this.bannerRef = React.createRef();
    this.logoRef = React.createRef();

  }

  handleThumbDrop() {
    return {
      addedfile: file => this.setState({ thumb_image: file })
    };
  }

  handleBannerDrop() {
    return {
      addedfile: file => this.setState({ banner_image: file })
    };

  }

  handleLogoDrop(){
    return {
      addedfile: file => this.setState({ logo: file })
    };

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

  buildForm () {
    let formData = new FormData();
                                                             
    formData.append("portfolio_item[name]", this.state.name);  // QUESTIONS // where does he get the portolfio_item name from? is it just a key?
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[position]", this.state.position);

    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }
    if (this.state.banner_image) {
      formData.append("portfolio_item[banner_image]", this.state.banner_image);
    }
    if (this.state.logo) {
      formData.append("portfolio_item[logo]", this.state.logo);
    } 
    // NOTES
    // DEBUGGER;
    // TO call from debugger FormData has a specific way. Using a for loop: for ( var value of formData.values()) { console.log(value) };
    return formData;
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    axios.post("https://alexisflores.devcamp.space/portfolio/portfolio_items", 
    this.buildForm(), 
    {
      withCredentials: true
    })
    .then(response => {
      this.props.handleSuccessfulFormSubmission(response.data.portfolio_item);

      this.setState ({ // Note //Highly discourage to do State manually on .then() function after a API call
        name:"",        // Note // This are only our state and we need to learn the form
        description: "",
        category: "eCommerce",
        position: "",
        url: "",
        thumb_image: "",
        banner_image: "",
        logo: ""
      });
  
      [this.thumbRef, this.bannerRef, this.logoRef].forEach((ref) => {
        ref.current.dropzone.removeAllFiles(); //Note // ref.current is reaching into the specific item
      })                                        // This will help clear the drop zones
    })
    .catch(error => {
      console.log("portolfio form handleSubmit error", error)
    });

    event.preventDefault();
    // Synthetic event is a virtual DOM which is created in React. It is not actually touching the Real DOM, and the virual DOM is created for performance
  }


  render() {
    return (

      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input type="text" name="name" placeholder="Portfolio Item Name" value={this.state.name} onChange={this.handleChange}/>
          <input type="text" name="url" placeholder="URL" value={this.state.url} onChange={this.handleChange}/>
        </div>
        <div className="two-column">
          <input type="text" name="position" placeholder="Position" value={this.state.position} onChange={this.handleChange}/>
          <select name="category" value={this.state.category} onChange={this.handleChange} className="select-element">
            <option value="eCommerce">eCommerce</option>
            <option value="Scheduling">Scheduling</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Technology">Technology</option>
          </select>
        </div>
        <div className="one-column">
          <textarea type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange}/>
        </div>

        <div className="image-uploaders">
          <DropzoneComponent 
              ref={this.thumbRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleThumbDrop()}
          >
            <div className="dz-message">Thumbnail</div>
          </DropzoneComponent>

          <DropzoneComponent 
              ref={this.bannerRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleBannerDrop()} // Note // You can make the method a non-closing tag and add a child component like we did 
              // with the <div></div> underneath and you can find that dz-message name in the inspect element in the DOM.
          >
            <div className="dz-message">Banner</div> 
          </DropzoneComponent>

          <DropzoneComponent 
              ref={this.logoRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleLogoDrop()}
          >
            <div className="dz-message">Logo</div>
          </DropzoneComponent>
          
        </div>

        <div>
          <button className="btn" type="submit">Save</button>
        </div>
      </form>

    );
  }
}