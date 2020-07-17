const Axios = require('axios');
const Express = require('express');
const Path = require('path');

const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.static(Path.join(__dirname, '../dist')));

app.get('/temp', async (req, res) => {
  const { lat, lng } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lng}&appid=${process.env.WEATHER_API_KEY}`;
  const resp = await Axios.get(url);
  
  res.json(resp.data.main);
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))
