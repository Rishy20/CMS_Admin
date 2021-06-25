import React, {useState} from 'react';
import Title from '../Title';
import Formbox from "../Formbox";


//Inputs stored as an array so they can be mapped to Input component
const inputs=[
    {
        label:"First Name",
        type:"text",
        name:"fname"
    },
    {
        label:"Last Name",
        type:"text",
        name:"lname"
    },
    {
        label:"Email",
        type:"email",
        name:"email"
    },
    {
        label:"Contact",
        type:"tel",
        name:"contact"
    },


    {
        label:"Password",
        type:"password",
        name:"password",

    },
    {
        label:"Confirm Password",
        type:"password",
        name:"confirmPassword",

    },
    {
        label:"Country",
        type:"select",
        name:"country",
        values:["Sri Lanaka","India","USA"]

    },

]

//Buttons to be displayed in the form
const buttons = [
    {
        name:"Save ",
        style:"btn-save",
        type:"Submit"
    },
    {
        name:"Cancel",
        style:"btn-cancel",
    },
]
//Input box names used in the form so that they can be sent to useForm hook to maintain the state
const names={
    fname:'',
    lname:'',
    email:'',
    contact:'',
    password:'',
    country:'',
    confirmPassword:'',

}
//Form Submit Url
const url = "http://localhost:3000/api/v1/reviewer";

function AddReviewer(){
    const[isSubmitted,setIsSubmitted] = useState(false);

    function submitForm(){
        setIsSubmitted(true);
        console.log("Form Submitted")
    }
    return (
        <div>
            <Title text="add reviewer"/>
            <Formbox title="Reviewer Information" input={inputs} buttons={buttons} names={names} callback={submitForm} url={url}/>
        </div>
    )
}

export default AddReviewer;