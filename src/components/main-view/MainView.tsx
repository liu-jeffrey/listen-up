import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./mainViewStyles";
import IMainViewOwnProps from './mainView.type';

class MainView extends Component<IMainViewOwnProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
      </div>
    );
  }
}
export default withStyles(styles)(MainView);
