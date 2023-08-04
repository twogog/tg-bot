const url = "https://www.cbr-xml-daily.ru/daily_json.js";

async function getCurrency(ctx) {
  const response = await fetch(url);
  const data = await response.json();
  const { Valute } = data;
  let message = [];
  Object.entries(Valute)
    .filter((v) => ["EUR", "USD"].includes(v[0]))
    .forEach(async (ar) => {
      const [name, info] = ar;
      const { Name, Previous, Value } = info;
      message.push(`${Name}: предыдущий - ${Previous}; нынешний - ${Value}`);
    });
  await ctx.reply(message.join("\n"));
}

module.exports = {
  getCurrency,
};
