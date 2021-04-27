import React from "react";
import './FormBox.css'
import Button from "./Button";
import Input from './Input'
import Grid from '@material-ui/core/Grid'

//FormBox in admin menu
function FormBox(props){
    const inputs= props.input;
    return(
        <div className='formbox'>
            <div className="form-top">
                <h3 className="form-title">{props.title}</h3>
                <span className="top-btn">
                    <Button name={"Save Changes"} btnStyle={"btn-save"}/>
                    <Button name={"Cancel"} btnStyle={"btn-cancel"} />
                </span>
            </div>

            <div className="form-body">

                <Grid container spacing={2} justify="center">
                    {   //Map input array to input components
                        inputs.map(input=>{
                            return <Grid item xs={12} md={6} >
                                <Input label= {input.label} type={input.text} placeholder={input.placeholder}  id={input.id} key={input.id}/>
                            </Grid>
                        })
                    }
                </Grid>


            </div>
        </div>
    )
}
export default FormBox;