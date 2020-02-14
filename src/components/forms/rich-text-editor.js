import React, {Component} from 'react'
import { EditorState, convertToRaw} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import  draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default class RichTextEditor extends Component{
  constructor(props) {
    super(props);

    // NoteTwo // state has its own set of functions since it a rich text editor
    this.state = {
      editorState: EditorState.createEmpty()
    }

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.getBase64 = this.getBase64.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
  }

  onEditorStateChange(editorState) {
    // NoteTwo // By adding the second argument we can make the setState wait since it's asyn so it has to complete before moving forward
    this.setState(
      { editorState },
      this.props.handleRichTextEditorChange(
        draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    )
    );
    
  }

  getBase64(file, callback) {
    // asyncronise function
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = error => {};
  }
  
  uploadFile(file) {
    // NoteFour // Base64 encoders
    // Filereader works with promises
    return new Promise((resolve, reject) => {
      this.getBase64(file, data => resolve({ data: {link: data}}));
    });
  }

  render() {
    return (
        <div>
            <Editor 
              editorState={this.state.editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange} // NoteTwo // this is a prop passed in Editor
              // NoteThree // When passing an Object in a prop, we need to pass a double curly bracket
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: {
                  uploadCallback: this.uploadFile,
                  alt: { present: true, mandatory: false },
                  previewImage: true,
                  inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
                }
              }}            />
        </div>
    );
  }
}