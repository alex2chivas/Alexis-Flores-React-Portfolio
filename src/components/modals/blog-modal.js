import React, {Component} from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement(".app-wrapper"); // Note // This is to remove the warning in the console so screen readers do not have a problem 

export default class BlogModal extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '700px'
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
        <h1>I am in a modal!</h1>
      </ReactModal>
    )
  }
}