module.exports = async (request, response) => {
  try {
    process.env.NTBA_FIX_319 = "test";

    const { Telegraf } = require("telegraf");
    const { message } = require("telegraf/filters");
    const { getCurrency } = require("../currency");

    const bot = new Telegraf(process.env.TOKEN);

    bot.launch({
      webhook: {
        // Public domain for webhook; e.g.: example.com
        domain: process.env.DOMAIN,

        // Port to listen on; e.g.: 8080
        port: process.env.PORT || 8080,

        // Optional path to listen for.
        // `bot.secretPathComponent()` will be used by default
        hookPath: webhookPath || process.env.DOMAIN,
      },
    });
    // Retrieve the POST request body that gets sent from Telegram
    const { body } = request;

    // Ensure that this is a message being sent
    if (body.message) {
      // Retrieve the ID for this chat
      // and the text that the user sent
      const {
        chat: { id },
        text,
      } = body.message;

      // Create a message to send back
      // We can use Markdown inside this
      const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;

      // Send our new message back in Markdown and
      // wait for the request to finish
      await bot.sendMessage(id, message, { parse_mode: "Markdown" });
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
