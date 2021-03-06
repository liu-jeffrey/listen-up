import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import cardProps from "./cards-dashboard-types";
import useStyles from "./cards-dashboard-styles";
import CardDialog from "../cards-dialogue/cards-dialog";
import { stringify } from "../../utils/StringUtils.js";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default function CardDashboard(props: cardProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDialogOpen = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.person.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.person.date}
            <List dense={true}>
            {stringify(props.person.transcript).map((string) => (
              <ListItem>
                <ListItemText
                  primary={string}
                />
              </ListItem>
              
            ))}
            </List>
          </Typography>
          <Typography variant="body2" component="p">
            {/* props.person.transcript */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={toggleDialogOpen}>Details</Button>
        </CardActions>
      </Card>
      <CardDialog
        person={props.person}
        isOpen={open}
        toggleDialog={toggleDialogOpen}
      />
    </React.Fragment>
  );
}
