import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { Component } from "react";
import styles from "./appBarStyles";
import * as types from "./mainAppBar.type";

class MainAppBar extends Component<types.MainAppBarProps, types.IMainAppBarState> {
    public state = {
        anchorEl: null,
    };

    public handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    }

    public handleMenuClose = () => {
        this.setState({
            anchorEl: null,
        });
    }

    public render() {
        const { classes } = this.props;
        const open = this.props.isDrawerOpen;

        return (
            <React.Fragment>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {[classes.appBarShift]: open})}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={clsx(classes.menuButton, {[classes.hide]: open})}
                            color="inherit"
                            onClick={this.props.toggleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.appBarTitle} variant="h6" noWrap={true}>
                            ListenUp
                        </Typography>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MainAppBar);
