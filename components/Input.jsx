import React from 'react';
import './Input.css'
//Input box with label
function Input(props){

    return(
        <div>
            <label className="form-label" htmlFor={props.id}>{props.label}</label>
            <input className="input-box" type={props.type} id={props.id} placeholder={props.placeholder}/>
        </div>

    )

}
export default Input;