import React, {useEffect, useState} from "react";
import {
    CircularProgress,
    IconButton,
    makeStyles,
    Slide,
    Snackbar,
    SnackbarContent,
    Typography
} from "@material-ui/core";
import "./ProfileForm.css";
import validate from "./validateInfo";
import Input from "./Input";
import Grid from "@material-ui/core/Grid";
import Button from "./Button";
import {Close, Done} from "@material-ui/icons";
import AvatarSelector from "./AvatarSelector";

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
    },
    error: {
        backgroundColor: "#F44336"
    }
})

// Slide transition for the error message snackbar
const SlideTransition = props => (<Slide direction="up" {...props} />)

const personalInfo = [
    {label: "First Name", name: "fname"},
    {label: "Last Name", name: "lname"},
    {label: "Phone", name: "contact"},
    {label: "Email", name: "email"},
]

// Submit error message
const ERR_MSG = "Failed to save changes. Please try again...";

const ProfileForm = props => {
    const styles = useStyles();

    // Destructure props
    const {user, setUser, baseUrl} = props;

    // Form states
    const [values, setValues] = useState({...user});
    const [avatar, setAvatar] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [edit, setEdit] = useState(false);

    // Reset submit success state
    useEffect(() => setSubmitSuccess(false), []);

    // Handle user data autofill
    useEffect(() => {
        setValues({...user});
    }, [user])

    // Handle form input changes
    const handleChange = event => {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
        console.log(values);
    };

    // Handle adding an image
    const handleAddImg = img => {
        if (img.file) {
            const {file} = img;
            setAvatar(file);
            // Generate file name and set it to values state
            const filename = `${user._id}_${Date.now()}.${file.name.split(".").pop()}`;
            setValues({...values, avatar: filename});
        } else {
            setValues({...values, avatar: user.avatar});
            setAvatar(null);
        }
    }

    // Handle form submit
    const handleSubmit = event => {
        event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    }

    // Validate and submit form if no errors were found
    useEffect(() => {
            if(Object.keys(errors).length === 0 && isSubmitting ) {
                if (baseUrl) {
                    submitForm();
                }
            } else {
                setIsSubmitting(false);
            }
        },[isSubmitting]
    );

    // Submit form and handle the results
    const submitForm = () => {
        // Create a new form data object
        const data = new FormData();
        // Add input values and the avatar
        data.append("values", JSON.stringify(values));
        data.append("avatar", avatar);

        // Send PUT request to update user data and upload the avatar
        fetch(baseUrl + user._id, {
            method: "PUT",
            body: data
        }).then(res => res.json())
            .then(data => {
                handleSubmitResult(data);
                console.log(data)
            })
            .catch(err => {
                setSubmitError(ERR_MSG);
                setIsSubmitting(false);
                console.log(err);
            });
    }

    // Check the submit results and set states accordingly
    const handleSubmitResult = data => {
        if (data.status === "Success") {
            setSubmitError("");
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setEdit(false);
            setUser(values);
        } else if (data.status === "Error") {
            setSubmitError(ERR_MSG);
            setIsSubmitting(false);
        }
    }

    // Handle setting the edit mode
    const handleSetEdit = event => {
        event.preventDefault();
        setEdit(!edit);
        setSubmitSuccess(false);
        setValues({...user});
        setAvatar(null);
    }

    return (
        <>
            {/* Form header */}
            <Typography
                variant="body1"
                classes={{body1: styles.title}}
            >
                {props.title}
            </Typography>
            <hr className="divider" />

            {/* Form body */}
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Avatar selector */}
                <Grid container spacing={6}>
                    <Grid item xs={4}>
                        <label
                            htmlFor="avatar"
                            className={styles.label}
                        >
                            Avatar
                        </label>
                    </Grid>
                    <Grid item xs={7}>
                        <AvatarSelector
                            callback={handleAddImg}
                            avatarSrc={props.avatarSrc}
                            avatarTxt={props.avatarTxt}
                            edit={edit} />
                    </Grid>
                </Grid>

                {/* Form inputs */}
                {
                    personalInfo.map(input => (
                        <Grid container alignItems="center" spacing={6} key={input.name}>
                            {/* Input label */}
                            <Grid item xs={4}>
                                <label
                                    htmlFor={input.name}
                                    className={styles.label}
                                >
                                    {input.label}
                                </label>
                            </Grid>
                            {/* Input element */}
                            <Grid item xs={7}>
                                <Input
                                    value={values[input.name]} type="text" id={input.name} name={input.name}
                                    onChange={handleChange} error={errors[input.name]} inline
                                    disabled={!edit && true}
                                />
                            </Grid>
                        </Grid>
                    )
                )}

                {/* Buttons */}
                <div className={styles.buttons}>
                    {/* Submitting progress indicator */}
                    {isSubmitting && <CircularProgress size={"2.2em"} className={styles.progress} />}
                    {/* Submit success indicator */}
                    {submitSuccess && <Done className={styles.success} />}

                    {/* Save button */}
                    {edit && <Button
                        btnStyle="btn-save"
                        name="Save Changes"
                        type="submit"
                        disabled={isSubmitting}
                    />}
                    {/* Edit/Cancel button | This button toggles the edit mode */}
                    <Button
                        btnStyle={"btn-cancel"}
                        name={edit ? "Cancel" : "Edit"}
                        onclick={handleSetEdit}
                        disabled={isSubmitting}
                    />
                </div>
            </form>

            {/* Display submit error message if there is one */}
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                TransitionComponent={SlideTransition}
                open={submitError.length > 0} autoHideDuration={5000}
                onClose={() => setSubmitError("")}
            >
                <SnackbarContent
                    message={submitError}
                    className={styles.error}
                    action={
                        <IconButton size="small" onClick={() => setSubmitError("")} color="inherit">
                            <Close fontSize="small" />
                        </IconButton>
                    }
                />
            </Snackbar>
        </>
    )
}

export default ProfileForm;