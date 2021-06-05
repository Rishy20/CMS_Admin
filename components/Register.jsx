import React, {useEffect, useState} from "react";
import Form from "./Form";

// Form inputs
const inputs = [
    {
        label: "First Name",
        type: "text",
        name: "fname",
        placeholder: "Enter your first name"
    },
    {
        label: "Last Name",
        type: "text",
        name: "lname",
        placeholder: "Enter your last name"
    },
    {
        label: "Email",
        type: "email",
        name: "email",
        placeholder: "Enter your email"
    },
    {
        label: "Phone",
        type: "text",
        name: "contact",
        placeholder: "Enter your phone no."
    },
    {
        label: "Password",
        type: "password",
        name: "password",
        placeholder: "Enter a password"
    },
    {
        label: "Confirm Password",
        type: "password",
        name: "confirmPassword",
        placeholder: "Re-enter password"
    }
]

// Input box names used in the form
const names = {
    fname: "",
    lname: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: ""
}

// Form buttons
const buttons = [
    {
        name:"Register",
        style:"btn-save",
        type:"submit"
    }
]

const Register = props => {
    const {baseUrl, registerCallback} = props;
    const {setSubmitSuccess, setSubmitError} = props.setFeedback;

    const [role, setRole] = useState("editor");
    const [url, setUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form input for role, which would be used to set the form URL
    const roleInput = {
        label: "Role",
        type: "select",
        name: "role",
        values: ["Editor", "Reviewer"],
        onChange: event => setRole(event.target.value.toLowerCase())
    }

    // Callback method
    const callback = result => {
        if (result.status === "Success") {
            setSubmitSuccess("Registration successful! Please log in using your email and password.")
            registerCallback();
        } else {
            setSubmitError("Something went wrong! Please try again...");
        }

        setIsSubmitting(false);
    }

    // Set form URL
    useEffect(() => {
        role && setUrl(`${baseUrl}/${role}s`);
    }, [role])

    return (
        <div style={{marginBlockStart: "16px"}}>
            <Form
                inputs={[...inputs, roleInput]}
                names={names}
                btns={buttons}
                url={url}
                callback={callback}
                isSubmitting={isSubmitting}
                callbackIsSubmitting={() => setIsSubmitting(true)}
            />
        </div>
    )
}

export default Register;