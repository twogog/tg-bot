process.env.NTBA_FIX_319 = "test";
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const { getCurrency } = require("../currency");
const { getWeather } = require("../weather");
// require("dotenv").config();
const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) =>
  ctx.reply("Могу рассказать Вам о погоде и актуальном курсе валют на сегодня")
);

bot.command("currency", async (ctx) => {
  await getCurrency(ctx);
});

bot.on(message("text"), async (ctx) => {
  const [weather, ...city] = ctx.message.text.split(" ");
  const place = city?.join(" ");
  if (/погода/i.test(weather) && place) {
    await getWeather(ctx, process.env.WEATHER, place);
  } else {
    ctx.reply(
      'Чтобы узнать погоду, напишите: "Погода город". Если в ответе, указанная страна не совпадает с Вашей, введите название города на английском'
    );
  }
});

module.exports = async (request, response) => {
  try {
    // Ensure that this is a message being sent
    if (request?.body) {
      console.log(request.body);
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
