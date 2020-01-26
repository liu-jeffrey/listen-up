import React from 'react';
import useStyles from './gridDisplayStyles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { db } from "../../firebase/firebase";

export default function TitlebarGridList() {
  const classes = useStyles();
  const [peopleListData, setPeopleListData] = React.useState<any[]>([]);

  React.useEffect(() => {
    db.collection("people").onSnapshot((snapShot) => {
      let docList: any[] = [];
      snapShot.forEach((doc) => {
        docList.push(doc.data());
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
          {peopleListData.map(tile => (
            <GridListTile key={tile.img}>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }