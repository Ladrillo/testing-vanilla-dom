import 'regenerator-runtime'
import '@testing-library/jest-dom/extend-expect'
import fetch from 'node-fetch'

globalThis.fetch = fetch

import { screen, queries } from '@testing-library/dom'
import { server } from './src/mocks/server'
import { Card, cardAppender } from './src/components/card'
import { articles } from './src/mocks/data'

const bootstrap = Object.values(articles.articles.bootstrap).flat()
const javascript = Object.values(articles.articles.javascript).flat()
const jquery = Object.values(articles.articles.jquery).flat()
const node = Object.values(articles.articles.node).flat()
const technology = Object.values(articles.articles.technology).flat()

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  document.body.innerHTML = ''
})
afterAll(() => server.close())

describe('Card', () => {
  it('builds a card with the correct visible text', async () => {
    const card = Card(javascript[0])
    expect(queries.getByText(card, /The Next Step in the Evolution/i))
    expect(queries.getByText(card, /SIR RUFF/i))
  })
})

describe('cardAppender', () => {
  beforeEach(() => {
    cardAppender('body')
  })
  it('appends the bootstrap articles', async () => {
    const headlines = bootstrap.map(art => art.headline)
    for (let i = 0; i < headlines.length; i++) {
      expect(await screen.findByText(headlines[i])).toBeInTheDocument()
    }
  })
  it('appends the javascript articles', async () => {
    const headlines = javascript.map(art => art.headline)
    for (let i = 0; i < headlines.length; i++) {
      expect(await screen.findByText(headlines[i])).toBeInTheDocument()
    }
  })
  it('appends the jquery articles', async () => {
    const headlines = jquery.map(art => art.headline)
    for (let i = 0; i < headlines.length; i++) {
      expect(await screen.findByText(headlines[i])).toBeInTheDocument()
    }
  })
  it('appends the node articles', async () => {
    const headlines = node.map(art => art.headline)
    for (let i = 0; i < headlines.length; i++) {
      expect(await screen.findByText(headlines[i])).toBeInTheDocument()
    }
  })
  it('appends the technology articles', async () => {
    const headlines = technology.map(art => art.headline)
    for (let i = 0; i < headlines.length; i++) {
      expect(await screen.findByText(headlines[i])).toBeInTheDocument()
    }
  })
})
