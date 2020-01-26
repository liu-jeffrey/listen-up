import React from "react";
import useStyles from "./gridDisplayStyles";
import GridListTile from "@material-ui/core/GridListTile";
import { db } from "../../firebase/firebase";
import IPersonModel from "../../models/PeopleModels";
import CardDashboard from "../cards-dashboard/cards-dashboard";
import Grid from "@material-ui/core/Grid";

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
    <div className={classes.root}>
      <Grid container spacing={3}>
        {peopleListData.map(person => (
          <Grid className={classes.card}>
            <CardDashboard person={person} key={person.name} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
