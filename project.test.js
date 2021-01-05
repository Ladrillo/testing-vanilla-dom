import 'regenerator-runtime'
import '@testing-library/jest-dom/extend-expect'
import fetch from 'node-fetch'

globalThis.fetch = fetch

import { screen, queries } from '@testing-library/dom'
import { server } from './src/mocks/server'
import { Card, CardAppender } from './src/components/card'
import { articles } from './src/mocks/data'

const flattened = Object.values(articles.articles).flat()
const headlines = flattened.map(article => article.headline)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  document.body.innerHTML = ''
})
afterAll(() => server.close())

test('Card', async () => {
  const card = Card(flattened[0])
  expect(queries.getByText(card, 'ES8: The Next Step in the Evolution of Javascript and What it Means For Your Projects'))
  expect(queries.getByText(card, 'By SIR RUFF\'N\'STUFF'))
})

test('CardAppender', async () => {
  CardAppender('body')
  for (let i = 0; i < headlines.length; i++) {
    expect(await screen.findByText(headlines[i])).toBeInTheDocument()
  }
})
