import React from "react";
import Cookies from "js-cookie";
import Form from "./Form";

// Form inputs
const inputs = [
    {
        label: "Email",
        type: "email",
        name: "email",
        placeholder: "Enter your email address"
    },
    {
        label: "Password",
        type: "password",
        name: "password",
        placeholder: "Enter your password"
    }
]

// Input box names used in the form
const names = {
    email: "",
    password: ""
}

// Form buttons
const buttons = [
    {
        name:"Login",
        style:"btn-save",
        type:"submit"
    }
]

const Login = ({baseUrl, loginCallback, setSubmitError}) => {
    // Login URL
    const url = `${baseUrl}/login/admin`;

    // Callback method
    const callback = result => {
        if (result.auth) {
            Cookies.set("adminToken", result.token, {expires: 1, secure: true});
            loginCallback();
        } else {
            setSubmitError(result.message);
        }
    }

    return (
        <div style={{marginBlockStart: "16px"}}>
            <Form
                singleColumn
                inputs={inputs}
                names={names}
                btns={buttons}
                url={url}
                callback={callback}
            />
        </div>
    )
}

export default Login;