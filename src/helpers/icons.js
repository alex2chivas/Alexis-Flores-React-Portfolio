import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faSignOutAlt, faEdit, faMinusCircle, faSpinner, faPlusSquare, faPhone, faEnvelope, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
  return library.add(faTrash, faSignOutAlt, faEdit, faMinusCircle, faSpinner, faPlusSquare, faPhone, faEnvelope, faMapMarkedAlt)
}

export default Icons; // NoteTwo // This is a javascript funtion that can be passed anywhere. You can also make a api if you like and pass the 
// whatever information you want and have a cleaner code bass. 