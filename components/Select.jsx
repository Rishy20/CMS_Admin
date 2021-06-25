import React from "react";
import './styles/Select.css'
export default function Select(props){
    return (
        <div>
            <label className="form-label" htmlFor={props.name}>{props.label}</label>
            <select className={`form-select ${props.styles} ${props.disabled && "disabled"}`}
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    disabled={props.disabled}
            >
                {props.values.map(option => {
                    // Check if option is given as an object, and render it accordingly
                    if (option.value && option.displayAs) {
                        // If option is given as an object, render input value and display value separately
                        return (
                            <option value={option.value} key={option.value}>
                                {option.displayAs}
                            </option>
                        )
                    }

                    // If option is a string, render that string as both the input value and the display value
                    return <option value={option} key={option}>
                        {option}
                    </option>
                })}
            </select>

            {/* Print Validation errors */}
            <p className="error">{props.error}</p>
        </div>

    )
}