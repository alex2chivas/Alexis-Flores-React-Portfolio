import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faSignOutAlt, faEdit, faMinusCircle, faSpinner, faPlusSquare } from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
  return library.add(faTrash, faSignOutAlt, faEdit, faMinusCircle, faSpinner, faPlusSquare)
}

export default Icons;