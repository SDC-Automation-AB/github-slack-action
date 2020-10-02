# Slack Action
Will send slack messages as action to a specified channel.

Invite "bot" user too the channel if you use token

**Bot User OAuth Access Token**

Invite the bot to the channel, inside channel write 
```
/invite @BotName
```

## Errors
**if error ``not_in_channel``** 

 Invite bot to channel

**if error ``missing_scope``** 

Check authorized action scopes for token



#### References and Error codes

Post message to slack:

https://api.slack.com/methods/chat.postMessage#errors