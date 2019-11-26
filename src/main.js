const { core } = require('@actions/core');
const { WebClient } = require('@slack/web-api');
const fs = require('fs');

// Store file data chunks in this array
let chunks = [];
// We can use this variable to store the final data
let fileBuffer;

// Read file into stream.Readable
let fileStream = fs.createReadStream('text.txt');

// An error occurred with the stream
fileStream.once('error', (err) => {
    // Be sure to handle this properly!
    console.error(err); 
});

// File is done being read
fileStream.once('end', () => {
    // create the final data Buffer from data chunks;
    start();
    // Of course, you can do anything else you need to here, like emit an event!
});

// Data is flushed from fileStream in chunks,
// this callback will be executed for each chunk
fileStream.on('data', (chunk) => {
    chunks.push(chunk); // push data chunk to array

    // We can perform actions on the partial data we have so far!
});

function start() {
    // https://hooks.slack.com/services/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
    const web = new WebClient("xoxp-549700893668-792506314819-842613690337-fa7e0255b4ef00ffce016e5eca2d4a80");

    // The current date
    const currentTime = new Date().toTimeString();

    (async () => {
    // Use the `auth.test` method to find information about the installing user
    const res = await web.auth.test()

    // Find your user id to know where to send messages to
    const userId = res.user_id;
    console.log("Userid: " + userId);

    // Use the `chat.postMessage` method to send a message from this app
    await web.files.upload({
        channel: userId,
        file: Buffer.concat(chunks),
        initial_comment: "Test from app"
    });
    /*
    await web.chat.postMessage({
        channel: userId,
        text: `The current time is ${currentTime}`,
    });
    */
    console.log('File posted!');
    })();

    /*
    async function run() {
        try { 
        const ms = core.getInput('milliseconds');
        console.log(`Waiting ${ms} milliseconds ...`);
        } finally {

        }
    }
    */
}
