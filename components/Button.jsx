import React from 'react'

import './Button.css'

//Save and Cancel Button
function Button(props){
return(
    <button className={`btn ${props.btnStyle}`}>{props.name}</button>
)
}
export default Button;