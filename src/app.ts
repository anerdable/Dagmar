
import { App, LogLevel } from '@slack/bolt';
import dotenv from 'dotenv';
// import "./utils/env";

import { isGenericMessageEvent } from './utils/helpers'

dotenv.config();
export const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
export const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
export const SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN;

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
  socketMode: true, 
  appToken: SLACK_APP_TOKEN
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    // Filter out message events with subtypes (see https://api.slack.com/events/message)
    // Is there a way to do this in listener middleware with current type system?
    if (!isGenericMessageEvent(message)) return;
    // say() sends a message to the channel where the event was triggered
  
    await say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hey there <@${message.user}>!`
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me'
            },
            action_id: 'button_click'
          }
        }
      ],
      text: `Hey there <@${message.user}>!`
    });
  });
  
  app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
  });
  
  (async () => {
    // Start your app
    await app.start(Number(process.env.PORT) || 3000);
  
    console.log('⚡️ Bolt app is running!');
  })();

