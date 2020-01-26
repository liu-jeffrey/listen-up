import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { DialogWrapperProps } from "./audioRecordDialog.types.";
import useStyles from "./audioRecordDialogStyles";
import Fab from "@material-ui/core/Fab";
import MicIcon from '@material-ui/icons/Mic';

/**
 * A wrapper for creating a simple dialog with a message.
 * *NOTE*: For success and error messages, use the SnackbarContentWrapper instead.
 */
function AudioRecordDialog(props: DialogWrapperProps) {
    const [isLoading, setLoadingState] = React.useState(false);
    const { isOpen } = props;
    const classes = useStyles();

    const handleClick = () => {

    }

    return (
        <Dialog open={isOpen} onBackdropClick={props.toggleDialogOpen} >
            <DialogTitle id="simple-dialog-title">{"Press the mic button to start"}</DialogTitle>
            <DialogContent className={classes.main}>
                <Fab
                    variant={"round"}
                    color="primary"
                    className={ classes.button }
                    onClick={handleClick}
                >
                    <MicIcon />
                </Fab>
                {isLoading ? <CircularProgress /> : null}
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}

export default AudioRecordDialog;
