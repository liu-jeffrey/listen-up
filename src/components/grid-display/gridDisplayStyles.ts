import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    height: "100%",
    flexGrow: 1,
    overflow: "scroll",
    margin: "5vh"
  },
  card: {
    margin: "1vh"
  }
}));

export default useStyles;
