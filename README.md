# Struckbot

It's a slackbot made using javascript that perform some basic features in a slack channel like fetching ping,jokes,memes etc. made with help of guide [Make a Slackbot](https://stardance.hackclub.com/missions/slack-bot)
but it is slightly basic.
### Commands struckbot supports-
1. _**/Struckbot-help**_ - List all commands that struckbot supports.
2. _**/Struckbot-joke**_ - Fetches a joke via [Joke api](https://official-joke-api.appspot.com/random_joke).
3. _**/Struckbot-catfact**_ - Random cat fact using [catfact](https://official-joke-api.appspot.com/random_joke).
4. _**/Struckbot-ping**_ - checks your ping.
5. _**/Struckbot-meme**_ - Fetches and sends meme in slack channel using [meme-api](memeapi.com)
<img src="https://user-cdn.hackclub-assets.com/01a1e591-e10c-7539-b6f8-50d21b071876/Screenshot%202026-11-16%20234433.png">
+ Note
Meme api is facing outage. so `/struckbot-meme` won't work.

### Setup instructions
```
git clone https://github.com/yashxsonii/Struckbot
cd Struckbot
npm install
nano .env    # add your slack bot and slack app token here
node index.js
nano /etc/systemd/system/slackbot.service # responsible for running it 24/7
 ```

