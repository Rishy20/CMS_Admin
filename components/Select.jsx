import React from "react";
import './styles/Select.css'
export default function Select(props){
    return (
        <div>
            <label className="form-label" htmlFor={props.name}>{props.label}</label>
            <select className={`form-select ${props.styles}`} name={props.name} id={props.name}
                    value={props.value} onChange={props.onChange}
            >
                {props.values.map(value=>{
                    return <option value={value} key={value}>
                        {/* Display value in capitalized form */}
                        {`${value[0].toUpperCase()}${value.slice(1)}`}
                    </option>
                })}
            </select>{/*Print Validation errors           */}
            <p className="error">{props.error}</p>
        </div>

    )
}