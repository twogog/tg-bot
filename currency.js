const url = "https://www.cbr-xml-daily.ru/daily_json.js";

function getCurrency(ctx) {
  fetch(url)
    .then((r) => r.json())
    .then((r) =>
      Object.entries(r.Valute)
        .filter((v) => ["EUR", "USD"].includes(v[0]))
        .forEach((ar) => {
          const [name, info] = ar;
          const { Name, Previous, Value } = info;
          ctx.reply(`${Name}: предыдущий - ${Previous}; нынешний - ${Value}`);
        })
    );
}

module.exports = {
  getCurrency,
};
