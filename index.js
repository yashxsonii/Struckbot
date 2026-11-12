const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/struckbot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong! :time: \nLatency: ${latency}ms` });
});
app.command("/struckbot-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});
app.command("/struckbot-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});
app.command("/struckbot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/struckbot-ping - Check bot latency
/struckbot-joke - gets you a joke
/struckbot-help - gets you this window
/struckbot-catfact - Get a cat fact`
  });
});
app.command("/meme", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await fetch(
      "https://meme-api.com/gimme"
    );

    if (!response.ok) {
      throw new Error("Meme API failed");
    }

    const meme = await response.json();

    if (meme.nsfw || meme.spoiler) {
      throw new Error("Filtered meme");
    }

    await respond({
      response_type: "in_channel",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${meme.title}*\nPosted in r/${meme.subreddit}`
          }
        },
        {
          type: "image",
          image_url: meme.url,
          alt_text: meme.title
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `👍 ${meme.ups} | <${meme.postLink}|Original post>`
            }
          ]
        }
      ]
    });

  } catch (error) {
    console.error(error);
    await respond("Couldn't fetch a meme. Try again!");
  }
});

(async () => {
  await app.start();
  console.log("bot is running son!");
})();