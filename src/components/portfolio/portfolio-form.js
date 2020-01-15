import React, { Component} from "react";
import axios from "axios"

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
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  buildForm () {
    let formData = new FormData();
                                                             
    formData.append("portfolio_item[name]", this.state.name);  // QUESTIONS // where does he get the portolfio_item name from? is it just a key?
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[position]", this.state.position);
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
    })
    .catch(error => {
      console.log("portolfio form handleSubmit error", error)
    });

    event.preventDefault();
    // Synthetic event is a virtual DOM which is created in React. It is not actually touching the Real DOM, and the virual DOM is created for performance
  }


  render() {
    return (
      <div>
        <h1>PortfolioForm....</h1>
      
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="text" name="name" placeholder="Portfolio Item Name" value={this.state.name} onChange={this.handleChange}/>
            <input type="text" name="url" placeholder="URL" value={this.state.url} onChange={this.handleChange}/>
          </div>
          <div>
            <input type="text" name="position" placeholder="Position" value={this.state.position} onChange={this.handleChange}/>
            <select name="category" value={this.state.category} onChange={this.handleChange}>
              <option value="eCommerce">eCommerce</option>
              <option value="Scheduling">Scheduling</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
          <div>
            <textarea type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange}/>
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>

      </div>

    );
  }
}