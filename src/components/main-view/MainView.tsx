import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./mainViewStyles";
import IMainViewOwnProps from './mainView.type';
import CardGridDisplay from '../grid-display/GridDisplay';

class MainView extends Component<IMainViewOwnProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <CardGridDisplay />
      </div>
    );
  }
}
export default withStyles(styles)(MainView);
