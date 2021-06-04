import React, {useState} from "react";
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

// Form URL
const url = "https://icaf.site/api/v1/login/admin";

const Login = ({loginCallback, setSubmitError}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Callback method
    const callback = result => {
        if (result.auth) {
            Cookies.set("token", result.token, {expires: 1, secure: true});
            loginCallback();
        } else {
            setSubmitError(result.message);
        }

        setIsSubmitting(false);
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
                isSubmitting={isSubmitting}
                callbackIsSubmitting={() => setIsSubmitting(true)}
            />
        </div>
    )
}

export default Login;