import { App, LogLevel } from '@slack/bolt';
import dotenv from 'dotenv';
// import "./utils/env";

import { GetListOfWeekdays, GetMarsDays,  } from './holidays/themedayController';
import { isGenericMessageEvent } from './utils/helpers';

dotenv.config();
export const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
export const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
export const SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN;

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
});

const today = new Date();
today.setDate(today.getDate());
today.setSeconds(today.getSeconds() + 10);
const _today = Math.floor(today.valueOf() / 1000);

const channelId = 'C027YEKSQT0';

app.message('hi', async ({ client }) => {
  try {
    // Call chat.scheduleMessage with the built-in client
    await client.chat.scheduleMessage({
      channel: channelId,
      post_at: _today,
      text: 'Summer has come and passed',
    });
  } catch (error) {
    console.error(error);
  }
});

app.event('app_mention', async ({ event, say }) => {
  await say({
    text: `:wave: <@${event.user}> Hej, jag heter Dagmar och jag hjälper dig hålla reda på olika temadag(m)ar!`,
  });
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
          text: `Tjabba tjena hallå <@${message.user}>!`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'DON´T PRESS THE BUTTON',
          },
          action_id: 'button_click',
        },
      },
    ],
    text: `shu bre <@${message.user}>!`,
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

  // Listens to incoming messages that contain "hello"
  app.message('march', async ({ message, say }) => {
    // Filter out message events with subtypes (see https://api.slack.com/events/message)
    // Is there a way to do this in listener middleware with current type system?
    
    console.log('GET THE DAYS!!!!!!!');
    // const _monthDays = GetDaysWithinMonth(3);
    const days = GetMarsDays(); // Mars
    let daysMessage = "These are the themedays in March!  -->"; 
    days.forEach(day => {
      daysMessage = daysMessage + ` ${ day.title} ${ day.date.toDateString() }, `;
    });
  
    if (!isGenericMessageEvent(message)) return;
    // say() sends a message to the channel where the event was triggered
  
    await say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${daysMessage}!`
          },
        }
      ],
      text: `HEJ <@${message.user}>!`
    });
  });
  
  app.message('mondays', async ({ message, say }) => {
    // Filter out message events with subtypes (see https://api.slack.com/events/message)
    // Is there a way to do this in listener middleware with current type system?
    
    console.log('get mondays');
    const mondays = GetListOfWeekdays(1); // Mondays
    let daysMessage = "Varsågod, här kommer några måndagar -->"; 
  
  
    mondays.forEach(day => {
      daysMessage = daysMessage + ` ${day.toDateString() }, `;
    });
  
    if (!isGenericMessageEvent(message)) return;
    // say() sends a message to the channel where the event was triggered
  
    await say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${daysMessage}!`
          },
        }
      ],
      text: `HEJ <@${message.user}>!`
    });
  });

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT) || 3000);

  console.log(
    '⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️ Dagmar is running!⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️'
  );
  console.log(
    '⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️ Dagmar is running!⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️'
  );
  console.log(
    '⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️ Dagmar is running!⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️'
  );
  console.log(
    '⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️ Dagmar is running!⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️'
  );
  console.log(
    '⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️ Botmar is Deadmar!⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️'
  );
})();
