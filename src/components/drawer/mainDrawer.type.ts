import { WithStyles } from "@material-ui/core";
import styles from "./mainDrawerStyles";
import IPersonModel from "../../models/PeopleModels";

export interface IMainDrawerState {
    peopleDataList: IPersonModel[];
}
export interface IMainDrawerOwnProps extends
WithStyles<typeof styles> {
    toggleDrawerOpen: () => void;
    toggleDialogOpen: () => void;
    isDrawerOpen: boolean;
}

export type MainDrawerProps = IMainDrawerOwnProps;
