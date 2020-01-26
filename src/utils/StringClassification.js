// Imports the Google Cloud client library


// Creates a client

const classifyText = async (text) => {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          return this.responseText

          console.log("Done!");
          newOutputNode.innerHTML = JSON.stringify(data);
          console.log(JSON.stringify(data));
          UpdateSpeakerRecognition(text, data, newOutputNode);
      }
  };
  xmlhttp.open("POST", "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.1/entities");
  xmlhttp.setRequestHeader("Content-Type", "application/json");
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

export default classifyText;