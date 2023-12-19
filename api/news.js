// api/news.js
module.exports = async function (req, res) {
    try {
      const API_KEY = "38f61bbf54e847959ccad89b2b747cbd"; // Replace with your News API key
      const fetch = require('node-fetch');
  
      const url = "https://newsapi.org/v2/everything?q=";
      const query = req.query.q;

      console.log("query", query);
  
      if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required.' });
      }
  
      const apiUrl = `${url}${query}&apiKey=${API_KEY}`;
      const response = await fetch(apiUrl);

      // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  