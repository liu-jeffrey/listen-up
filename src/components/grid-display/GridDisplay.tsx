import React from 'react';
import useStyles from './gridDisplayStyles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { db } from "../../firebase/firebase";
import IPersonModel from '../../models/PeopleModels';
import CardDashboard from '../cards-dashboard/cards-dashboard';

export default function CardGridDisplay() {
  const classes = useStyles();
  const [peopleListData, setPeopleListData] = React.useState<IPersonModel[]>([]);

  React.useEffect(() => {
    db.collection("people").onSnapshot((snapShot) => {
      let docList: IPersonModel[] = [];
      snapShot.forEach((doc) => {
        docList.push(doc.data() as IPersonModel);
      });

      setPeopleListData(docList);
    })
  }, []);

    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">People</ListSubheader>
          </GridListTile>
          {peopleListData.map(person => (
            <GridListTile>
              <CardDashboard person={person} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }