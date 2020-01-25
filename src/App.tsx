import React from 'react';
import clsx from 'clsx';
import RecordButton from './components/record-button/recordButton';
import useStyles from './appStyles';
import MainDrawer from './components/drawer/MainDrawer';
import MainAppBar from './components/app-bar/MainAppBar';
import { CssBaseline } from '@material-ui/core';

function App() {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerState] = React.useState(false);

  const toggleDrawerOpen = () => {
    setDrawerState(!isDrawerOpen);
  }

  return (
    <div className={clsx("App", classes.root)}>
      <CssBaseline />
      <MainAppBar isDrawerOpen={isDrawerOpen} toggleDrawerOpen={toggleDrawerOpen} />
      <MainDrawer isDrawerOpen={isDrawerOpen} toggleDrawerOpen={toggleDrawerOpen} />
      <RecordButton isDrawerOpen={isDrawerOpen} />
    </div>
  );
}

export default App;
