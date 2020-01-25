import { withStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";
import React, { Component } from "react";
import RecordButton from '../record-button/recordButton';
import { MainDrawerProps } from "./mainDrawer.type";
import styles from "./mainDrawerStyles";

class MainDrawer extends Component<MainDrawerProps, {}> {
    public render() {
        const { classes } = this.props;
        const open = this.props.isDrawerOpen;

        return (
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {[classes.drawerOpen]: open, [classes.drawerClose]: !open})}
                classes={{ paper: clsx({[classes.drawerOpen]: open, [classes.drawerClose]: !open}) }}
                open={open}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.props.toggleDrawerOpen}>
                        {<ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <RecordButton isDrawerOpen={this.props.isDrawerOpen} />
            </Drawer>
        );
    }
}

export default withStyles(styles)(MainDrawer);
