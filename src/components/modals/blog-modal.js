import React, {Component} from 'react';
import ReactModal from 'react-modal';

import BlogForm from "../blog/blog-form"

ReactModal.setAppElement(".app-wrapper"); // Note // This is to remove the warning in the console so screen readers do not have a problem 

export default class BlogModal extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : '-50px',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '675px'
      },
      overlay: {
        backgroundColor       : 'rgba(1, 1, 1, 0.85)',
        position: 'fixed'
      }
    };
  }

  render() {
    return (
      <ReactModal 
      style={this.customStyles}
      onRequestClose={() => {
        this.props.handleModalClose();
      }} 
      isOpen={this.props.modalIsopen}>
        <BlogForm/>
      </ReactModal>
    )
  }
}