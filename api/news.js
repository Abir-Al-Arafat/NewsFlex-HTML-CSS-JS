// api/news.js
const fetch = require('node-fetch');

module.exports = async function (req, res) {
  try {
    const API_KEY = "38f61bbf54e847959ccad89b2b747cbd"; // Replace with your News API key
    const url = "https://newsapi.org/v2/everything?q=";
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required.' });
    }

    const apiUrl = `${url}${query}&apiKey=${API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
