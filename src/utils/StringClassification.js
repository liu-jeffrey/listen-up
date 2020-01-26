// Imports the Google Cloud client library
const language = require('@google-cloud/language');

const projectId = "listenup-266222";
const keyFileName = require("./listenup-266222-09b295fa2062.json");
// Creates a client
const client = new language.LanguageServiceClient({projectId, keyFileName});

const classifyText = async (text) => {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  const [result] = await client.analyzeEntities({document});
  return result.entities;
}

classifyText();
