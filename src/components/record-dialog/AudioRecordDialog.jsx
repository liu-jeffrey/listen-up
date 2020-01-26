import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { DialogWrapperProps } from "./audioRecordDialog.types.";
import useStyles from "./audioRecordDialogStyles";
import Fab from "@material-ui/core/Fab";
import MicIcon from '@material-ui/icons/Mic';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk'

/**
 *      
 */

/**
 * A wrapper for creating a simple dialog with a message.
 * *NOTE*: For success and error messages, use the SnackbarContentWrapper instead.
 */
function AudioRecordDialog(props) {

    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription("81a9d036e53f496dbed484f794ea7419", "eastus");
    speechConfig.speechRecognitionLanguage = "en-US";
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

    const [isLoading, setLoadingState] = React.useState(false);
    let [recognizer, setRecognizer] = React.useState(new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig));
    const [authorizationToken, setAuthToken] = React.useState("");
    let [speaker, setSpeaker] = React.useState(null);
    const [isRecording, toggleRecording] = React.useState(false);

    const { isOpen } = props;
    const classes = useStyles();
    const subKey = "6cf8c271e4244481a489f85f638b1c45";

    const StartRecognitionSuccess = () => {
        console.log("Started Recording");
    };
    const StartRecognitionFaileur = (err) => {
        alert("Error Starting to Recording");
        CloseRecognizer();
    }

    const RecognizingEventListener = (sender, event) => {
        console.log("Recognizing: " + event.result.text);
    }
    const RecognizedEventListener = (sender, event) => {
        console.log("Recognized: " + event.result.text);
        GetSentimentInfo(event.result.text, {});
    }

    const GetSentimentInfo = (text, data) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Sentient: " + this.responseText);
                const partData = JSON.parse(this.responseText);
                data.score = partData.documents[0].score;

                GetKeyPhraseInfo(text, data);
            }
        };
        xmlhttp.open("POST", "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.1/sentiment?showStats");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Ocp-Apim-Subscription-Key", subKey);
        xmlhttp.send(JSON.stringify(
            {
                "documents": [{
                    "language": "en",
                    "id": "1",
                    "text": text
                }]
            }
        ));
    }
    const GetKeyPhraseInfo = (text, data) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Key Phrase: " + this.responseText);
                const partData = JSON.parse(this.responseText);
                const keyPhrasesPart = partData.documents[0].keyPhrases;
                data.keyPhrase = [];
                keyPhrasesPart.forEach((phrase) => {
                    data.keyPhrase.push({
                        "phrase": phrase,
                        "type": ""
                    });
                });

                GetEntityInfo(text, data);
            }
        };
        xmlhttp.open("POST", "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.1/keyPhrases");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Ocp-Apim-Subscription-Key", subKey);
        xmlhttp.send(JSON.stringify(
            {
                "documents": [{
                    "language": "en",
                    "id": "1",
                    "text": text
                }]
            }
        ));
    }
    const GetEntityInfo = (text, data) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Entity: " + this.responseText);
                const partData = JSON.parse(this.responseText);
                const entitiesPart = partData.documents[0].entities;
                entitiesPart.forEach((entity) => {
                    data.keyPhrase.forEach((p) => {
                        if (entity.name == p.phrase) {
                            p.type = entity.type;
                        }
                    });
                });

                console.log("Done!");
                console.log(JSON.stringify(data));
                UpdateSpeakerRecognition(text, data);
            }
        };
        xmlhttp.open("POST", "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.1/entities");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Ocp-Apim-Subscription-Key", subKey);
        xmlhttp.send(JSON.stringify(
            {
                "documents": [{
                    "language": "en",
                    "id": "1",
                    "text": text
                }]
            }
        ));
    }
    const UpdateSpeakerRecognition = (text, data) => {
        if (text.toLowerCase().startsWith("hey")) {
            data.keyPhrase.forEach((p) => {
                let name = null;
                if (p.type == "Person") {
                    name = p.phrase;
                }
                let splitString = text.split(" ")
                if (name && splitString.length > 1) {
                    let testName = splitString[1];
                    let punctuationless = testName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                    testName = punctuationless.replace(/\s{2,}/g, " ");

                    if (name.includes(testName)) {
                        speaker = name;

                        console.log("New Name: " + name);
                        return;
                    }
                }
            });
        }
    }

    const StopRecognitionSuccess = () => {
        console.log("Stopped Recording");
        CloseRecognizer();
    }
    const StopRecognitionFaileur = (err) => {
        alert("Error Stopping Recording");
        CloseRecognizer();
    }
    const CloseRecognizer = () => {
        recognizer.close();
        recognizer = undefined;
    }

    const handleClick = () => {
        if (!isRecording) {
            console.log("Atempting to start recording");
            toggleRecording(true);

            recognizer.startContinuousRecognitionAsync(StartRecognitionSuccess, StartRecognitionFaileur);
            recognizer.recognizing = RecognizingEventListener;
            recognizer.recognized = RecognizedEventListener;
        } else {
            console.log("Atempting to stop recording");

            if (recognizer) {
                recognizer.stopContinuousRecognitionAsync(StopRecognitionSuccess, StopRecognitionFaileur);
                toggleRecording(false);
            }
        }
    }


    return (
        <Dialog open={isOpen} onBackdropClick={props.toggleDialogOpen} >
            <DialogTitle id="simple-dialog-title">{"Press the mic button to start"}</DialogTitle>
            <DialogContent className={classes.main}>
                <Fab
                    variant={"round"}
                    color="primary"
                    className={classes.button}
                    onClick={handleClick}
                >
                    <MicIcon />
                </Fab>
                {isLoading ? <CircularProgress /> : null}
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}

export default AudioRecordDialog;
