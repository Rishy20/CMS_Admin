import React, {useState} from "react";
import {
    makeStyles,
    Typography
} from "@material-ui/core";
import "./styles/ProfileForm.css";
import PersonalInfo from "./PersonalInfo";
import ChangePassword from "./ChangePassword";
import FeedbackMsg from "./FeedbackMsg";

const useStyles = makeStyles({
    title: {
        fontSize: "1.3em",
        marginInlineStart: "8px"
    },
    form: {
        paddingInline: "16px",
        paddingBlock: "24px"
    },
    label: {
        fontWeight: "500",
    },
    buttons: {
        position: "absolute",
        top: 130,
        right: 36,
    },
    progress: {
        color: "#E2BC7F",
        float: "left",
        marginBlockStart: "7px",
        marginInlineEnd: "8px"
    },
    success: {
        color: "#4CAF50",
        fontSize: "2.3em",
        float: "left",
        marginBlockStart: "6px",
        marginInlineEnd: "8px"
    }
})

const ProfileForm = props => {
    const styles = useStyles();

    // Destructure props
    const {user, setUser, baseUrl} = props;

    // State for managing the submit error message
    const [submitError, setSubmitError] = useState("");

    return (
        <>
            {/* Form header */}
            <Typography
                variant="body1"
                classes={{body1: styles.title}}
            >
                {props.changePassword ? "Change Password" : "Personal Information"}
            </Typography>
            <hr className="divider" />

            {/* Form body */}
            {props.changePassword ?
                <ChangePassword
                    styles={styles}
                    user={user} setUser={setUser} baseUrl={baseUrl}
                    setSubmitError={setSubmitError}
                />
            :
                <PersonalInfo
                    styles={styles}
                    user={user} setUser={setUser} baseUrl={baseUrl}
                    avatarSrc={props.avatarSrc} avatarTxt={props.avatarTxt}
                    setSubmitError={setSubmitError}
                />
            }

            {/* Display submit error message if there is one */}
            <FeedbackMsg error msg={submitError} onClose={() => setSubmitError("")} />
        </>
    )
}

export default ProfileForm;