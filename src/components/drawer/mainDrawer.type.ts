import { WithStyles } from "@material-ui/core";
import styles from "./mainDrawerStyles";

export interface IMainDrawerState {
    peopleDataList: any[];
}
export interface IMainDrawerOwnProps extends
WithStyles<typeof styles> {
    toggleDrawerOpen: () => void;
    toggleDialogOpen: () => void;
    isDrawerOpen: boolean;
}

export type MainDrawerProps = IMainDrawerOwnProps;
