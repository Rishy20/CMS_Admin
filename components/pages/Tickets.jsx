import React, {useState} from 'react';
import Title from '../Title';
import Formbox from "../Formbox";

const inputs=[
    {
        label:"Name",
        type:"select",
        name:"type",
        values:["Day Pass", "Conference Pass", "VIP Pass", "Elite Pass"]
    },
    {
        label:"Price",
        type:"number",
        name:"price",
    },
    {
        label:"Description",
        type:"text",
        name:"description",
    },
    {
        label:"Quantity",
        type:"number",
        name:"qty",
    }
]
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
const names={
    type:'',
    description:'',
    price:'',
    qty:'',
}
const url = "http://localhost:3000/api/v1/researchers";
function Tickets(){
    const[isSubmitted,setIsSubmitted] = useState(false);

    function submitForm(){
        setIsSubmitted(true);
        console.log("Form Submitted")
    }

    return (
        <div>
            <Title text="Tickets"/>
            <Formbox title="Tickets Information" input={inputs} buttons={buttons} names={names} callback={submitForm} url={url}/>
        </div>
    )
}

export default Tickets;