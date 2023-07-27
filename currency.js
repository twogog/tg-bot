const url = "https://www.cbr-xml-daily.ru/daily_json.js";

async function getCurrency(ctx) {
  const response = await fetch(url);
  const data = await response.json();
  const { Valute } = data;
  Object.entries(Valute)
    .filter((v) => ["EUR", "USD"].includes(v[0]))
    .forEach((ar) => {
      const [name, info] = ar;
      const { Name, Previous, Value } = info;
      ctx.reply(`${Name}: предыдущий - ${Previous}; нынешний - ${Value}`);
    });
}

module.exports = {
  getCurrency,
};
