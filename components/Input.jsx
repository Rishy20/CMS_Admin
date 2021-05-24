import React from 'react';
import './Input.css'


//Input box with label
function Input(props){

    return(
        <div>
            <label className="form-label" htmlFor={props.name}>{props.label}</label>
            <input className={`input-box ${props.inline && "input-box-inline"} ${props.disabled && "disabled"}`}
                   type={props.type} name={props.name} id={props.name} value={props.value}
                   placeholder={props.placeholder} maxLength={props.maxLength}
                   onChange={props.onChange} disabled={props.disabled} />
            {/*Print Validation errors           */}
            <p className="error">{props.error}</p>
        </div>

    )

}
export default Input;