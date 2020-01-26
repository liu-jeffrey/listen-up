
let subscriptionKey, serviceRegion;
let authorizationToken;
let SpeechSDK;
let recognizer;

const subKey = "6cf8c271e4244481a489f85f638b1c45";

const processingDispay = document.getElementById("processing");
const results = document.getElementById("results");
const conclusions = document.getElementById("conclusions");

let speaker = null;

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const endButton = document.getElementById("endButton");
    subscriptionKey = document.getElementById("subscriptionKey");
    serviceRegion = document.getElementById("serviceRegion");

    startButton.addEventListener("click", function () {
        startButton.disabled = true;
        endButton.disabled = false;

        // This creates the recongizer object
        InitializeRecognizer();

        recognizer.startContinuousRecognitionAsync(StartRecognitionSuccess, StartRecognitionFaileur);
        recognizer.recognizing = RecognizingEventListener;
        recognizer.recognized = RecognizedEventListener;
    });
    endButton.addEventListener("click", function () {
        startButton.disabled = false;
        endButton.disabled = true;

        if (recognizer) {
            recognizer.stopContinuousRecognitionAsync(StopRecognitionSuccess, StopRecognitionFaileur);
        }
    });

    if (!!window.SpeechSDK) {
        SpeechSDK = window.SpeechSDK;
        startButton.disabled = false;
        // in case we have a function for getting an authorization token, call it.
        if (typeof RequestAuthorizationToken === "function") {
            RequestAuthorizationToken();
        }
    }
});

StartRecognitionSuccess = () => {
    startButton.disabled = true;
    endButton.disabled = false;
    console.log("Started Recording");
    processingDispay.innerHTML = "Started";
};

StartRecognitionFaileur = (err) => {
    startButton.disabled = false;
    endButton.disabled = true;
    alert("Error Starting to Recording");
    CloseRecognizer();
}

RecognizingEventListener = (sender, event) => {
    console.log("Recognizing: " + event.result.text);
    processingDispay.innerHTML = "Processing: " + event.result.text;
}

RecognizedEventListener = (sender, event) => {
    console.log("Recognized: " + event.result.text);

    const newTextNode = document.createElement("p");
    newTextNode.innerHTML = event.result.text;
    results.appendChild(newTextNode);
    processingDispay.innerHTML = "Processing: Done!";

    const newOutputNode = document.createElement("pre");
    newOutputNode.innerHTML = event.result.text;
    conclusions.appendChild(newOutputNode);
    newOutputNode.innerHTML = "";

    GetSentimentInfo(event.result.text, {}, newOutputNode);
}

GetSentimentInfo = (text, data, newOutputNode) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Sentient: " + this.responseText);
            const partData = JSON.parse(this.responseText);
            data.score = partData.documents[0].score;

            newOutputNode.innerHTML = JSON.stringify(data);
            GetKeyPhraseInfo(text, data, newOutputNode);
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
GetKeyPhraseInfo = (text, data, newOutputNode) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
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

            newOutputNode.innerHTML = JSON.stringify(data);
            GetEntityInfo(text, data, newOutputNode);
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
GetEntityInfo = (text, data, newOutputNode) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
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
            newOutputNode.innerHTML = JSON.stringify(data);
            console.log(JSON.stringify(data));
            UpdateSpeakerRecognition(text, data, newOutputNode);
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

UpdateSpeakerRecognition = (text, data, newOutputNode) => {
    if (text.toLowerCase().startsWith("hey")) {
        data.keyPhrase.forEach((p) => {
            let name = null;
            if (p.type == "Person") {
                name = p.phrase;
            }
            let splitString = text.split(" ")
            if (name && splitString.length > 1) {
                let testName = splitString[1];
                let punctuationless = testName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                testName = punctuationless.replace(/\s{2,}/g," ");

                if (name.includes(testName)) {
                    speaker = name;

                    console.log("New Name: " + name);
                    newOutputNode.innerHTML = JSON.stringify(data) + " <b>New Name: " + name + "</b>";
                    return;
                }
            }
        });
    }
}

StopRecognitionSuccess = () => {
    console.log("Stopped Recording");
    CloseRecognizer();
    processingDispay.innerHTML = "Stopped";
}

StopRecognitionFaileur = (err) => {
    alert("Error Stopping Recording");
    CloseRecognizer();
}

InitializeRecognizer = () => {
    const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, serviceRegion.value);
    speechConfig.speechRecognitionLanguage = "en-US";
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
}

CloseRecognizer = () => {
    recognizer.close();
    recognizer = undefined;
}

ResetRecognizer = () => {
    CloseRecognizer();
    InitializeRecognizer();
}

RequestAuthorizationToken = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const token = JSON.parse(atob(this.responseText.split(".")[1]));
            serviceRegion.value = token.region;
            authorizationToken = this.responseText;
            subscriptionKey.disabled = true;
            subscriptionKey.value = "using authorization token (hit F5 to refresh)";
            console.log("Got an authorization token: " + token);
        }
    };
    xmlhttp.open("POST", "https://eastus.api.cognitive.microsoft.com/sts/v1.0/issueToken");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Ocp-Apim-Subscription-Key", "81a9d036e53f496dbed484f794ea7419");
    xmlhttp.send();
}