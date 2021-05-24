import React from 'react'

import './Button.css'

//Save and Cancel Button
function Button(props){
    return(
        <button
            className={`btn ${props.btnStyle} ${props.disabled && "disabledBtn"}`}
            onClick={props.onclick}
            type={props.type}
            disabled={props.disabled}
        >
            {props.name}
        </button>
    )
}
export default Button;