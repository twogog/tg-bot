(async () => {
  require("dotenv").config();
  const { Telegraf } = require("telegraf");
  const { message } = require("telegraf/filters");
  const { getCurrency } = require("./currency");

  const bot = new Telegraf(process.env.TOKEN);

  bot.start((ctx) => ctx.reply("Привет, выбери команду из главного меню)"));

  bot.command("currency", async (ctx) => {
    getCurrency(ctx);
  });

  // bot.on(message("text"), (ctx) => {
  //   console.log(ctx.message);
  // });

  bot.launch();

  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
})();
