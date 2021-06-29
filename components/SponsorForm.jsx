import React, {useEffect, useState} from "react";
import validate from "./validateInfo";
import Input from "./Input";
import Grid from "@material-ui/core/Grid";
import FileUpload from "./FileUpload";
import "./styles/FormBox.css";
import Button from "./Button";
import {CircularProgress} from "@material-ui/core";
import Title from "./Title";

const btnTop={
    position: "absolute",
    top: 146,
    right: 35
}

const formLabel = {
    marginBottom: ".5rem",
    fontSize: "14px",
    display: "inline-block",
}

const progress = {
    color: "#E2BC7F",
    marginBlockStart: "8px",
    marginInlineEnd: "8px",
    float: "right"
}

const SponsorForm = props => {
    const [values,setValues] = useState({
        name: "",
        file: "",
    });
    const [file, setFile] = useState(null);
    const [errors,setErrors] = useState({});
    const [isSubmitting,setIsSubmitting] = useState(false);

    useEffect(() => {
        props.originData && setValues({...props.originData});
    }, [props.originData])

    const handleChange = e=>{
        const {name,value} = e.target;
        setValues({...values,[name]:value});
    };

    const handleAddFile = sponsor => {
        if (sponsor.file) {
            const {file} = sponsor;
            setFile(file);
            setValues({...values, file: file.name});
        } else {
            setValues({...values, file: props.originData ? props.originData.file : ""});
            setFile(null);
        }
    }

    //This function is executed on form submission
    const handleSubmit = e=> {
        e.preventDefault();
        //Sets errors if there are errors
        setErrors(validate(values));
        setIsSubmitting(true);
        console.log(errors);
    }

    const handleCancel = event => {
        event.preventDefault();
        props.callback();
    }

    useEffect(
        ()=>{
            // Checks if there are no errors and the form is in IsSubmitting state
            if(Object.keys(errors).length === 0 && isSubmitting ){
                // Submit the form
                if(props.url){
                    submitForm();
                }else{
                    //Callback the submitForm method
                    props.callback(values);
                }

            }
        },[errors]
    );

    //This function handles the POST api call to submit the form data
    const submitForm = () => {
        let data;

        data = new FormData();
        data.append("image", file);
        data.append("values", JSON.stringify(values));

        fetch(props.update ? `${props.url}/${props.originData._id}` : props.url,{
            method: props.update ? "PUT" : "POST",
            body: data
        }).then(res => res.json())
            .then(data=>props.callback(data))
            .catch(err=>console.log(err))
    }

    useEffect(() => {
        console.log(values);
    }, );

    return (
        <div>
            <Title text={props.title}/>
            <div className='formbox'>
                <div className="form-top">
                    <h3 className="form-title">{props.formTitle}</h3>
                </div>

                <div className="form-body">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}  justify="center">
                            <Grid item xs={12} md={6}>
                                <Input label="Sponsor Name" value={values.name} id="name" type="text"
                                       name="name" onChange={handleChange} placeholder="Enter sponsor name"
                                       error={errors["name"] ? errors["name"] : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <label style={formLabel}>Sponsor Image</label>
                                <FileUpload callback={handleAddFile} imagePreview />
                            </Grid>
                        </Grid>

                        <div style={btnTop}>
                            <Button
                                btnStyle={"btn-cancel"}
                                name={"Cancel"}
                                disabled={isSubmitting}
                                onclick={handleCancel}
                            />
                            <Button
                                btnStyle={"btn-save"}
                                name={"Save"}
                                disabled={isSubmitting}
                            />

                            {/* Submitting progress indicator */}
                            {isSubmitting && <CircularProgress size={"2.2em"} style={progress}/>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SponsorForm;