import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { cardProps } from "./cards-dashboard-types";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

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

export default function SimpleCard(props: cardProps) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        {/* <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        ></Typography> */}
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
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
}
