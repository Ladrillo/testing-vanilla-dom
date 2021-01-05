import axios from 'axios'

const Card = (article) => {
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

  headline.innerText = article.headline
  image.src = article.authorPhoto
  authorName.textContent = `By ${article.authorName}`

  card.addEventListener('click', () => {
    console.log(headline.textContent)
  })

  return card
}

// const CardAppender = (selector) => {
//   axios.get('https://www.lambdatimes.com/api/articles')
//     .then(({ data }) => {
//       const articles = Object.values(data.articles).flat()
//       const container = document.querySelector(selector)
//       articles.forEach(article => container.append(Card(article)))
//     })
// }

const CardAppender = async (selector) => {
  const res = await axios.get('https://www.lambdatimes.com/api/articles')
  const articles = Object.values(res.data.articles).flat()
  const container = document.querySelector(selector)
  articles.forEach(article => container.append(Card(article)))
}

// Do not delete the lines below
export { Card }
export { CardAppender }
