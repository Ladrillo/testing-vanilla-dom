import axios from 'axios'

const Card = (article) => {
  // Must use .textContent instead of .innerText!
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
  const res = await axios.get('https://lambda-times-api.herokuapp.com/articles')
  const articles = Object.values(res.data.articles).flat()
  const container = document.querySelector(selector)
  articles.forEach(article => container.append(Card(article)))
}

// Do not delete the lines below
export { Card }
export { cardAppender }
