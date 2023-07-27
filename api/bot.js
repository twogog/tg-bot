process.env.NTBA_FIX_319 = "test";
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const { getCurrency } = require("../currency");

module.exports = async (request, response) => {
  try {
    const bot = new Telegraf(process.env.TOKEN);

    // Retrieve the POST request body that gets sent from Telegram
    const { body } = request;

    // Ensure that this is a message being sent
    if (body?.message) {
      // Retrieve the ID for this chat
      // and the text that the user sent
      const {
        chat: { id },
        text,
      } = body.message;

      bot.on(message("text"), (ctx) => ctx.reply("Hello"));

      bot.launch({
        webhook: {
          // Public domain for webhook; e.g.: example.com
          domain: process.env.DOMAIN,

          // Port to listen on; e.g.: 8080
          port: process.env.PORT || 8080,
          // hookPath: "/api/bot",
        },
      });
    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error("Error sending message");
    console.log(error.toString());
  }

  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  // The message here doesn't matter.
  response.send("OK");
};
