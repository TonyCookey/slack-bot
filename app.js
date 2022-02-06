const { App } = require('@slack/bolt');

const helloResponse = require('./responses/hello.response')
const hobbiesResponse = require('./responses/hobbies.response')

// Initializes your app with your bot token and app token
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Listens to incoming messages that contain "hi"
app.message('hi', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

// Listens to incoming commands
app.command('/bot', async ({ command, say }) => {
  await ack();

  await say(`Hey there <@${command.user_name}>!`);

  await say(`Type in '/bot-hello' to continue...`);
});

app.command('/bot-hello', async ({ ack, say }) => {
  // Acknowledge command request
  await ack();

  await say('Welcome. How are you doing?');

  await say(helloResponse);

});
app.action('hello-response-completed', async ({ ack, say }) => {
  // Acknowledge command request
  await ack();

  await say('What are your favorite hobbies?');

  await say(hobbiesResponse)

});

app.action('hobbies-response-completed', async ({ command, ack, say }) => {
  await ack();

  await say(`Thank you <@${command.user_name}>!`);

});


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Slack Bot is online!');
})();