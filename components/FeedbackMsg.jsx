import React from "react";
import {IconButton, makeStyles, Slide, Snackbar, SnackbarContent} from "@material-ui/core";
import {Close} from "@material-ui/icons";

const useStyles = makeStyles({
    error: {
        backgroundColor: "#F44336"
    },
    success: {
        backgroundColor: "#4CAF50"
    }
})

const FeedbackMsg = ({msg, onClose, error}) => {
    const styles = useStyles();

    // Slide transition for the error message snackbar
    const SlideTransition = props => <Slide direction="up" {...props} />

    return (
        <Snackbar
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            TransitionComponent={SlideTransition}
            open={msg.length > 0} autoHideDuration={5000}
            onClose={onClose}
        >
            <SnackbarContent
                message={msg}
                className={error ? styles.error: styles.success}
                action={
                    <IconButton size="small" onClick={onClose} color="inherit">
                        <Close fontSize="small" />
                    </IconButton>
                }
            />
        </Snackbar>
    )
}

export default FeedbackMsg;