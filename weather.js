const url = (key, city) =>
  `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=yes&lang=ru`;

async function getWeather(ctx, key, city) {
  const response = await fetch(url(key, city.trim()));
  const data = await response.json();
  if (data?.error) {
    ctx.reply("Город не найден");
    return;
  }
  const {
    location: { name, country, localtime },
    current: {
      temp_c,
      condition: { text },
      wind_kph,
      feelslike_c,
      gust_kph,
      air_quality, // : { co, no2, o3, so2, pm2_5, pm10 }
    },
  } = data;
  const result = `Температура: ${temp_c}C, по ощущению ${feelslike_c}C
Скорость ветра: ${wind_kph} км/ч
Страна: ${country}`;
  ctx.reply(result);
  // Состояние воздуха: ${JSON.stringify(air_quality, undefined, "\n").replaceAll(
  //  /"/g,
  //  "")
}

module.exports = {
  getWeather,
};
