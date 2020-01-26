import React from "react";
import useStyles from "./gridDisplayStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import { db } from "../../firebase/firebase";
import IPersonModel from "../../models/PeopleModels";
import CardDashboard from "../cards-dashboard/cards-dashboard";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default function CardGridDisplay() {
  const classes = useStyles();
  const [peopleListData, setPeopleListData] = React.useState<IPersonModel[]>(
    []
  );

  React.useEffect(() => {
    db.collection("people").onSnapshot(snapShot => {
      let docList: IPersonModel[] = [];
      snapShot.forEach(doc => {
        docList.push(doc.data() as IPersonModel);
      });

      setPeopleListData(docList);
    });
  }, []);

  return (
    // <div className={classes.root}>
    //   <GridList cellHeight={180} className={classes.gridList}>
    //     <GridListTile key="Subheader" cols={2} style={{ height: "25%" }}>
    //       <ListSubheader component="div">People</ListSubheader>
    //     </GridListTile>
    //     <div className={classes.list}>
    //       {peopleListData.map(person => (
    //         <GridListTile className={classes.CardDashboard}>
    //           <CardDashboard person={person} />
    //         </GridListTile>
    //       ))}
    //     </div>
    //   </GridList>
    // </div>
    <div className={classes.root}>
      <div id={classes.verticalCont}>
        <Grid container spacing={3}>
          {peopleListData.map(person => (
            <GridListTile>
              <CardDashboard person={person} key={person.name} />
            </GridListTile>
          ))}
        </Grid>
      </div>
    </div>
  );
}
