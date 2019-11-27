const { core } = require('@actions/core');
const { WebClient } = require('@slack/web-api');
const fs = require('fs');

async function run() {
/*
    const SLACK_CHANNEL = core.getInput('SLACK_CHANNEL', { required: true });
    const SLACK_TOKEN = core.getInput('SLACK_TOKEN', { required: true });
    const SLACK_TITLE = core.getInput('SLACK_TITLE', { required: true });
    const SLACK_COMMENT = core.getInput('SLACK_COMMENT', { required: true });
    const SLACK_FILE = core.getInput('SLACK_FILE', { required: true });
    const SLACK_FILENAME = core.getInput('SLACK_FILENAME', { required: true });
*/
    const SLACK_CHANNEL = "dslink-java-elvaco";
    const SLACK_TOKEN = "xoxb-549700893668-843124358353-5Epz9tNcBaqjIv8vTfot8qtP";
    const SLACK_TITLE = "Titel"
    const SLACK_COMMENT = "Kommentar";
    const SLACK_FILE = "tmp/dslink-java-v2-elvaco-virtual.zip";
    const SLACK_FILENAME = "dslink-java-v2-elvaco-virtual-v1.2.zip";

    try {
        const web = new WebClient(SLACK_TOKEN);

        // upload file to slack and post it
        var meta = await web.files.upload({
            channels: SLACK_CHANNEL,
            file: fs.createReadStream(SLACK_FILE),
            title: SLACK_TITLE,
            filename: SLACK_FILENAME,
            initial_comment: SLACK_COMMENT
        });
        if (meta.ok) {
            console.log("File posted!");
//            core.debug('File posted!');
        } else {
            console.error("Error could not post file to slack!");
//            core.setFailed('Error could not post file too slack!');
        }
    } catch(Err) {
        console.error(Err);
//        core.setFailed("Error ", Err);
    }

//    console.log(meta);
}

run();
