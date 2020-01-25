import { WithStyles } from "@material-ui/core";
import styles from "./appBarStyles";

export interface IMainAppBarState {
    anchorEl: HTMLElement | null;
}

export interface IMainAppBarOwnProps extends WithStyles<typeof styles> {
    toggleDrawerOpen: () => void;
    isDrawerOpen: boolean;
}

export type MainAppBarProps = IMainAppBarOwnProps;
