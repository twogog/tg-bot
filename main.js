require("dotenv").config();
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const { getCurrency } = require("./currency");

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => ctx.reply("Привет, выбери команду из главного меню)"));

bot.command("currency", async (ctx) => {
  getCurrency(ctx);
});

if (process.env.environment == "PRODUCTION") {
  bot.launch({
    webhook: {
      domain: process.env.DOMAIN, // Your domain URL (where server code will be deployed)
      port: process.env.PORT || 8000,
    },
  });
} else {
  // if local use Long-polling
  bot.launch().then(() => {
    console.info(`The bot ${bot.botInfo.username} is running locally`);
  });
}

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
