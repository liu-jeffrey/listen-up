import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { DialogProps } from "@material-ui/core/Dialog";

import cardProps from "./cards-dashboard-types";
import useStyles from "./cards-dashboard-styles";
import CardDialog from "../cards-dialogue/cards-dialog";

function stringify(strArr: string[]): string {
  const length: number = strArr.length;

  if (length === 1) {
    return strArr[0];
  } else {
    let strSoFar: string = "";
    for (let i = 0; i < length; i++) {
      if (i === length - 1) {
        strSoFar += strArr[i];
      } else {
        strSoFar += strArr[i] + ", ";
      }
    }
    return strSoFar;
  }
}

export default function CardDashboard(props: cardProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDialogOpen = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.guestName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.date}
          </Typography>
          <Typography variant="body2" component="p">
            {stringify(props.keyWords)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={toggleDialogOpen}>Details</Button>
        </CardActions>
      </Card>
      <CardDialog
        date={props.date}
        guestName={props.guestName}
        keyWords={props.keyWords}
        transcript={props.transcript}
        isOpen={open}
        toggleDialog={toggleDialogOpen}
      />
    </React.Fragment>
  );
}
