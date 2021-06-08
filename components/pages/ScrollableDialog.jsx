import React, {useEffect} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";

const ScrollableDialog = props => {
    const {isOpen, text, closeCallback} = props;

    const [open, setOpen] = React.useState(false);

    // Open dialog if 'open' prop is true
    useEffect(() => {
        isOpen && setOpen(true);
    }, [isOpen])

    // Handle closing the dialog
    const handleClose = () => {
        setOpen(false);
        closeCallback && closeCallback();
    };

    // Handle copying the text to clipboard
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(text)
            .then(() => handleClose());
    }

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
            >
                <DialogContent dividers>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCopyToClipboard} color="primary">
                        Copy to clipboard
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ScrollableDialog;