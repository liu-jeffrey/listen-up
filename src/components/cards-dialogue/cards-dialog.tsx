import React from "react";
import Button from "@material-ui/core/Button";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { stringify } from "../../utils/StringUtils";

import dialogProps from "./cards-dialog-types";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

export default function CardDialog(props: dialogProps) {
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (props.isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.isOpen]);

  return (
    <div>
      <Dialog
        open={props.isOpen}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{ props.person.name }</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {props.person.date}
            <List>
            {stringify(props.person.transcript).map((string) => (
              <ListItem>
                <ListItemText
                  primary={string}
                />
              </ListItem>
              
            ))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.toggleDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
