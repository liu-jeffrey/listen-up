import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    appBarSpacer: {
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    },
    content: {
      // backgroundColor: "blue",
      flexGrow: 1,
      padding: theme.spacing(3),
      overflow: "hidden",
    }
  });

export default styles;
