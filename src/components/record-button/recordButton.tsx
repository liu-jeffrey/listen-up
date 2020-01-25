import Fab from "@material-ui/core/Fab";
import MicIcon from '@material-ui/icons/Mic';
import clsx from "clsx";
import React from "react";
import * as types from "./recordButtonTypes";
import useStyles from "./recordButtonStyles";

const RecordButton = (props: types.RecordButtonProps) => {
    const classes = useStyles();
    const isDrawerOpen = props.isDrawerOpen;

    const handleClick = () => {
    };

    return (
        <Fab
            variant={isDrawerOpen ? "extended" : "round"}
            color="primary"
            className={clsx({[classes.extendedButton]: isDrawerOpen}, classes.button)}
            onClick={handleClick}
        >
            <MicIcon className={clsx({[classes.leftIcon]: isDrawerOpen})} />
            {isDrawerOpen ? "Record" : null}
        </Fab>
    );
};

export default RecordButton
