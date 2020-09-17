const core = require('@actions/core');
const { WebClient } = require('@slack/web-api');
const fs = require('fs');

async function run() {

    try {
        const SLACK_CHANNEL = core.getInput('SLACK_CHANNEL', { required: true });
        const SLACK_TOKEN = core.getInput('SLACK_TOKEN', { required: true });
        const SLACK_TITLE = core.getInput('SLACK_TITLE', { required: true });
        const SLACK_COMMENT = core.getInput('SLACK_COMMENT', { required: true });
        const SLACK_FILE = core.getInput('SLACK_FILE', { required: true });
        const SLACK_FILENAME = core.getInput('SLACK_FILENAME', { required: true });

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
            core.debug('File posted to slack!');
        } else {
            core.setFailed('Error could not post file too slack!');
        }
     } catch(err) {
        core.setFailed(`Slack action failed with error ${err}`);
    }
}

run();
