import axios from 'axios'

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const card = document.createElement('div')
  const headline = document.createElement('div')
  const author = document.createElement('div')
  const imgContainer = document.createElement('div')
  const image = document.createElement('img')
  const authorName = document.createElement('span')

  card.appendChild(headline)
  card.appendChild(author)
  author.appendChild(imgContainer)
  author.appendChild(authorName)
  imgContainer.appendChild(image)

  card.classList.add('card')
  headline.classList.add('headline')
  author.classList.add('author')
  imgContainer.classList.add('img-container')

  headline.textContent = article.headline
  image.src = article.authorPhoto
  authorName.textContent = `By ${article.authorName}`

  card.addEventListener('click', () => {
    console.log(headline.textContent)
  })

  return card
}

// const cardAppender = (selector) => {
//   fetch('https://lambda-times-api.herokuapp.com/articles')
//     .then(res => res.json())
//     .then(data => {
//       const articles = Object.values(data.articles).flat()
//       const container = document.querySelector(selector)
//       articles.forEach(article => container.append(Card(article)))
//     })
// }

// const cardAppender = (selector) => {
//   axios.get('https://lambda-times-api.herokuapp.com/articles')
//     .then(({ data }) => {
//       const articles = Object.values(data.articles).flat()
//       const container = document.querySelector(selector)
//       articles.forEach(article => container.append(Card(article)))
//     })
// }

const cardAppender = async (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not arrive organized in a single, neat array. Inspect the response closely!
  // Using all articles in the response build a card from each one, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  const res = await axios.get('https://lambda-times-api.herokuapp.com/articles')
  const articles = Object.values(res.data.articles).flat()
  const container = document.querySelector(selector)
  articles.forEach(article => container.appendChild(Card(article)))
}

export { Card, cardAppender }
