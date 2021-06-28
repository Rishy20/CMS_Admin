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

const KeynoteForm = props => {
    const [values,setValues] = useState({
        fname: "",
        lname: "",
        jobTitle: "",
        company: "",
        country: "",
        bio: "",
        img: "",
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

    const handleAddFile = image => {
        if (image.file) {
            const {file} = image;
            setFile(file);
            setValues({...values, img: file.name});
        } else {
            setValues({...values, img: props.originData ? props.originData.file : ""});
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
        let data = JSON.stringify(values);

        data = new FormData();
        data.append("file", file);
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
                                <Input label="First Name" value={values.fname} id="fname" type="text"
                                       name="fname" onChange={handleChange}
                                       error={errors["fname"] ? errors["fname"] : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input label="Last Name" value={values.lname} id="lname" type="text"
                                       name="lname" onChange={handleChange}
                                       error={errors["lname"] ? errors["lname"] : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input label="Job Title" value={values.jobTitle} id="jobTitle" type="text"
                                       name="jobTitle" onChange={handleChange}
                                       error={errors["jobTitle"] ? errors["jobTitle"] : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input label="Company" value={values.company} id="company" type="text"
                                       name="company" onChange={handleChange}
                                       error={errors["company"] ? errors["company"] : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input label="Country" value={values.country} id="country" type="text"
                                       name="country" onChange={handleChange}
                                       error={errors["country"] ? errors["country"] : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input label="Bio" value={values.bio} id="bio" type="textarea"
                                       name="bio" onChange={handleChange}
                                       error={errors["bio"] ? errors["bio"] : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <label style={formLabel}>Image</label>
                                <FileUpload callback={handleAddFile} imagesOnly imagePreview />
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

export default KeynoteForm;