import React from 'react';
import clsx from 'clsx';
import RecordButton from './components/record-button/recordButton';
import useStyles from './appStyles';
import MainDrawer from './components/drawer/MainDrawer';
import MainAppBar from './components/app-bar/MainAppBar';
import { CssBaseline } from '@material-ui/core';
import AudioRecordDialog from './components/record-dialog/AudioRecordDialog';

function App() {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerState] = React.useState(false);
  const [isAudioDialogOpen, setAudioDialogState] = React.useState(false);

  const toggleDrawerOpen = () => {
    setDrawerState(!isDrawerOpen);
  }

  const toggleAudioDialogOpen = () => {
    setAudioDialogState(!isAudioDialogOpen);
  }

  return (
    <div className={clsx("App", classes.root)}>
      <CssBaseline />
      <AudioRecordDialog isOpen={isAudioDialogOpen} toggleDialogOpen={toggleAudioDialogOpen} />
      <MainAppBar isDrawerOpen={isDrawerOpen} toggleDrawerOpen={toggleDrawerOpen} />
      <MainDrawer isDrawerOpen={isDrawerOpen} toggleDrawerOpen={toggleDrawerOpen} toggleDialogOpen={toggleAudioDialogOpen} />
      <RecordButton isDrawerOpen={isDrawerOpen} toggleDialogOpen={toggleAudioDialogOpen} />
    </div>
  );
}

export default App;
