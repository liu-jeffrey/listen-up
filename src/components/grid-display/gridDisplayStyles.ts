import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        height: '100%',
        flexGrow: 1,
        overflow: 'hidden',
    },
    // gridList: {
    //     width: 500,
    //     height: "100%",
    // },
    // list: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'flex-start',
    //     height: '75%',
    // },
    // icon: {
    //     color: 'rgba(255, 255, 255, 0.54)',
    // },
    verticalCont: {
        display: 'flex',
        flexDirection: 'column',
    },
    CardDashboard: {
        padding: '1vw',
        height: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default useStyles;
