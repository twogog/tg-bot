process.env.NTBA_FIX_319 = "test";
const { Telegraf } = require("telegraf");
const { getCurrency } = require("../currency");

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => ctx.reply("Welcome"));
bot.command("currency", (ctx) => getCurrency(ctx));

module.exports = async (request, response) => {
  try {
    // Ensure that this is a message being sent
    if (request?.body) {
      await bot.handleUpdate(request.body);
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
