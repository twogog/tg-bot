// require("dotenv").config();
// import { Telegraf } from "telegraf";
// import { message } from "telegraf/filters";
// const { getCurrency } = require("./currency");

// const bot = new Telegraf(process.env.TOKEN);

// bot.start((ctx) => ctx.reply("Привет, выбери команду из главного меню)"));

// bot.command("currency", async (ctx) => {
//   getCurrency(ctx);
// });

// bot.launch({
//   webhook: {
//     // Public domain for webhook; e.g.: example.com
//     domain: process.env.DOMAIN,

//     // Port to listen on; e.g.: 8080
//     port: process.env.PORT || 8080,

//     // Optional path to listen for.
//     // `bot.secretPathComponent()` will be used by default
//     hookPath: webhookPath,
//   },
// });
