import React from "react";

onresize = "name()"

function name(){
  var w = window.outerWidth;
  var ww = document.documentElement.scrollWidth;

  if (w > 650 && ww > 650) {
    return (
      <div className="remove-div">
        ALEXIS FLORES
      </div>
    )
  } else {
    return null;
  }
}



export default name;

