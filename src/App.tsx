import React from 'react';
import clsx from 'clsx';
import RecordButton from './components/record-button/recordButton';
import useStyles from './appStyles';
import MainDrawer from './components/drawer/MainDrawer';
import MainAppBar from './components/app-bar/MainAppBar';
import { CssBaseline } from '@material-ui/core';
import AudioRecordDialog from './components/record-dialog/AudioRecordDialog';
import MainView from './components/main-view/MainView';

function App() {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerState] = React.useState(false);
  const [isAudioDialogOpen, setAudioDialogState] = React.useState(false);

  const toggleDrawerOpen = () => {
    setDrawerState(!isDrawerOpen);
  };

  const toggleAudioDialogOpen = () => {
    setAudioDialogState(!isAudioDialogOpen);
  }

  return (
    <div className={clsx("App", classes.root)}>
      <script src="microsoft.cognitiveservices.speech.sdk.bundle-min.js"></script>
      <CssBaseline />
      <AudioRecordDialog isOpen={isAudioDialogOpen} toggleDialogOpen={toggleAudioDialogOpen} />
      <MainAppBar isDrawerOpen={isDrawerOpen} toggleDrawerOpen={toggleDrawerOpen} />
      <MainDrawer isDrawerOpen={isDrawerOpen} toggleDrawerOpen={toggleDrawerOpen} toggleDialogOpen={toggleAudioDialogOpen} />
      <MainView />
    </div>
  );
}

export default App;
