// Imports the Google Cloud client library
const language = require('@google-cloud/language');

const projectId = "listenup-266222";
const keyFileName = require("./listenup-266222-09b295fa2062.json");
// Creates a client
const client = new language.LanguageServiceClient({projectId, keyFileName});
/**
 * TODO(developer): Uncomment the following line to run this code.
 */
// const text = 'Your text to analyze, e.g. Hello, world!';

// Prepares a document, representing the provided text
const document = {
  content: "I love listening to Marvin Gaye.",
  type: 'PLAIN_TEXT',
};

// Classifies text in the document

const classifyText = async () => {
  const [result] = await client.analyzeEntities({document});

  const entities = result.entities;
  console.log('Entities:');
  entities.forEach(entity => {
    console.log(entity.name);
    console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
    if (entity.metadata && entity.metadata.wikipedia_url) {
      console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
    }
  });
}

classifyText();


