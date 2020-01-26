import { withStyles, ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";
import React, { Component } from "react";
import RecordButton from '../record-button/recordButton';
import { MainDrawerProps, IMainDrawerState } from "./mainDrawer.type";
import styles from "./mainDrawerStyles";
import PersonIcon from '@material-ui/icons/Person';
import { db } from "../../firebase/firebase";
import IPersonModel from "../../models/PeopleModels";

class MainDrawer extends Component<MainDrawerProps, IMainDrawerState> {
    public state = {
        peopleDataList: [],
    };

    public componentDidMount() {
        db.collection("people").onSnapshot((snapShot) => {
            let docList: IPersonModel[] = [];
            snapShot.forEach((doc) => {
              docList.push(doc.data() as IPersonModel);
            });

            this.setState({
                peopleDataList: docList,
            });
        })
    }

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
                <RecordButton isDrawerOpen={this.props.isDrawerOpen} toggleDialogOpen={this.props.toggleDialogOpen} />
                <List>
                    {this.state.peopleDataList.map(person => (
                        <ListItem button={true} key="Trash">
                            <ListItemIcon>
                                    <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Trash" />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles)(MainDrawer);
