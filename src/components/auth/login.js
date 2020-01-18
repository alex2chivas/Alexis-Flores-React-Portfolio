import React, { Component } from "react";
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "", 
      password: "",
      errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // alexrunner002@gmail.com
  //Runner1994@ 
  //health4me app.

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  }

  handleSubmit(event) {
    axios.post("https://api.devcamp.space/sessions",
    {
      client: {
        email: this.state.email,
        password: this.state.password
      }
    },

    {
      withCredentials: true
    }

    ).then(response => {
      if (response.data.status === 'created') {
        console.log("You can come in...")
        this.props.handleSuccessfulAuth();
      } else {
        this.setState({
          errorText: "Wrong email or password"
        });
        this.handleUnsuccessfulAuth();
      }
    })
    .catch(error => {
      this.setState({
        errorText: "An error occured"
        
      });
      this.handleUnsuccessfulAuth();
    });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>

        <div>{this.state.errorText}</div>

        <form onSubmit={this.handleSubmit}/*<---This is the normal way to work with forms if it is only text values*/> 
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}