// script.js
document.addEventListener('DOMContentLoaded', async function () {
    fetchNews("Climate");
  });
  
  function reload() {
    window.location.reload();
  }
  
  async function fetchNews(query) {
    try {
      const response = await fetch(`/api/news?q=${query}`);
      const data = await response.json();
      console.log(data);
      bindData(data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }
  
  function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = '';
  
    articles.forEach(article => {
      if (!article.urlToImage) return;
      const cardClone = newsCardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone, article);
      cardsContainer.appendChild(cardClone);
    });
  }
  
  function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.getElementById('news-img');
    const newsTitle = cardClone.getElementById('news-title');
    const newsSource = cardClone.getElementById('news-source');
    const newsDesc = cardClone.getElementById('news-desc');
  
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
  
    const date = new Date(article.publishedAt).toLocaleString('en-US', {
      timeZone: 'Asia/Jakarta'
    });
  
    newsSource.innerHTML = `${article.source.name} ~ ${date}`;
  
    cardClone.firstElementChild.addEventListener('click', () => {
      window.open(article.url, '_blank');
    });
  }
  
  let currentSelectedNavItem = null;
  
  function handleClick(id) {
    fetchNews(id);
    currentSelectedNavItem?.classList.remove('active');
    const newSelectedNavItem = document.getElementById(id);
    currentSelectedNavItem = newSelectedNavItem;
    currentSelectedNavItem.classList.add('active');
  }
  
  const searchBtn = document.getElementById('search-btn');
  const searchText = document.getElementById('search-text');
  
  searchBtn.addEventListener('click', () => {
    if (!searchText.value) return;
    fetchNews(searchText.value);
    currentSelectedNavItem?.classList.remove('active');
    currentSelectedNavItem = null;
  });
  