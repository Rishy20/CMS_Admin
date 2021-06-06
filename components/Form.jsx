import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "./Select";
import Input from "./Input";
import useForm from "./useForm";
import validate from "./validateInfo";
import Button from "./Button";
import {CircularProgress} from "@material-ui/core";

const btnStyle={
    marginTop:30,
    marginBottom:10,
    width:"100%",
    textAlign:"right",
}
const btnTop={
    position: "absolute",
    top: 146,
    right: 35
}

const progress = {
    color: "#E2BC7F",
    display: "right",
    marginBlockStart: "8px",
    marginInlineEnd: "8px",
    float: "right"
}

function Form(props){
    const url = props.url;
    const inputs = props.inputs;
    const names = props.names;
    const callback = props.callback;
    const buttons = props.btns;
    const method = props.method;
    const adminUserUpdate = props.adminUserUpdate;
    const singleColumn = props.singleColumn;
    const isSubmitting = props.isSubmitting;
    const callbackIsSubmitting = props.callbackIsSubmitting;
    console.log(method);

    //Import methods from useForm hook
    const {handleChange, handleSubmit, values, errors } = useForm(
        callback, validate, names, url, method, adminUserUpdate, callbackIsSubmitting
    );

    // Cancel button action
    const handleCancel = event => {
        event.preventDefault();
        callback();
    }

    return(
        <div>
            <form onSubmit={handleSubmit} >
                <Grid container spacing={2}  justify="center">
                    {
                        //Map input array to input components
                        inputs.map(input=>{
                            if(input.type==="select"){
                                return <Grid item xs={12} md={singleColumn ? 12 : 6} key={input.name}>
                                    <Select name={input.name} label={input.label} values={input.values} value={values[input.name]}
                                            onChange={input.onChange ? input.onChange : handleChange}
                                            error={errors[input.name] ? errors[input.name] : ''}
                                    />
                                </Grid>
                            }else {
                                return <Grid item xs={12} md={singleColumn ? 12 : 6} key={input.name}>
                                    <Input label={input.label} value={values[input.name]} id={input.name} type={input.type}
                                           name={input.name} onChange={handleChange} placeholder={input.placeholder}
                                           error={errors[input.name] ? errors[input.name] : ''} maxLength={input.maxLength}
                                    />
                                </Grid>
                            }
                        })
                    }
                </Grid>

                <div style={props.btnstyle==='top'? btnTop:btnStyle}>
                    {/* Buttons */}
                    {
                        // Render buttons in reverse order to counter the reversing applied due to 'float: right' style
                        buttons.slice(0).reverse().map(btn => {
                            return <Button
                                btnStyle={btn.style}
                                name={btn.name}
                                type={btn.type}
                                key={btn.name}
                                disabled={isSubmitting}
                                onclick={btn.type === "cancel" ? handleCancel : () => {}}
                            />
                        })
                    }

                    {/* Submitting progress indicator */}
                    {isSubmitting && <CircularProgress size={"2.2em"} style={progress}/>}
                </div>
            </form>
        </div>
    )
}
export default Form;