const API_KEY = ""

const url = "https://newsapi.org/v2/everything?q="

// when page loads
window.addEventListener('load', ()=>{fetchNews("Climate")})

// for reloading the page
function reload(){
    window.location.reload()
}

// fetches news
async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await response.json()
    console.log(data);
    bindData(data.articles)
}

// helper function for showing data
function bindData(articles){
    const cardsContainer = document.getElementById("cards-container")

    const newsCardTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML = ''

    articles.forEach(article => {
        if(!article.urlToImage) return;
        // clones the template
        const cardClone = newsCardTemplate.content.cloneNode(true)
        // function for inserting data
        fillDataInCard(cardClone, article)
        // appends data in container
        cardsContainer.appendChild(cardClone)
    });
}

// for inserting data
function fillDataInCard(cardClone, article){
    const newsImg = cardClone.getElementById('news-img')
    const newsTitle = cardClone.getElementById('news-title')
    const newsSource = cardClone.getElementById('news-source')
    const newsDesc = cardClone.getElementById('news-desc')

    // inserts data from API
    newsImg.src = article.urlToImage
    newsTitle.innerHTML = article.title
    newsDesc.innerHTML = article.description

    const date = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    })

    newsSource.innerHTML = `${article.source.name} ~ ${date}`

    // handles card content click / shows main source of news
    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, '_blank')
    })
}

let currentSelectedNavItem = null
// handles navbar item selection
function handleClick(id){
    // fetches news according to id
    fetchNews(id)
    // removes active class if active class exists
    currentSelectedNavItem?.classList.remove('active')
    // gets element
    const newSelectedNavItem = document.getElementById(id)
    // sets element
    currentSelectedNavItem = newSelectedNavItem
    // adds class
    currentSelectedNavItem.classList.add('active')
}

const searchBtn = document.getElementById('search-btn')
const searchText = document.getElementById('search-text')

// handles search button click
searchBtn.addEventListener('click', ()=>{
    if(!searchText.value) return
    // fetches value according to text
    fetchNews(searchText.value)
    // removes active class if active class exists
    currentSelectedNavItem?.classList.remove('active')
    // sets nav item to null
    currentSelectedNavItem = null
})