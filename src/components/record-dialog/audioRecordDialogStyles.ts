import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        margin: theme.spacing(1),
        maxWidth: 175,
    },
    main: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    }
}));

export default useStyles;
