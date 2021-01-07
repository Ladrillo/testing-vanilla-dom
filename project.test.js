import 'regenerator-runtime'
import '@testing-library/jest-dom/extend-expect'
import fetch from 'node-fetch'

globalThis.fetch = fetch

import { screen } from '@testing-library/dom'
import { server } from './src/mocks/server'
import { Card, cardAppender } from './src/components/card'
import { Header, headerAppender } from './src/components/header'
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
  let card
  beforeEach(() => {
    card = Card(javascript[0])
  })
  it('returns a card with the correct headline (element, attrs and text)', () => {
    expect(card.querySelector('div.card>div.headline').textContent)
      .toMatch(/The Next Step in the Evolution/i)
  })
  it('returns a card with the correct author (element, attrs and text)', () => {
    expect(card.querySelector('div.card>div.author>span').textContent)
      .toMatch(/SIR RUFF/i)
  })
  it('returns a card with the correct image (element and src)', () => {
    expect(card.querySelector('div.card>div.author>div.img-container>img').src)
      .toBe(javascript[0].authorPhoto)
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

describe('Header', () => {
  let header
  beforeEach(() => {
    header = Header('foo', 'bar', 'baz')
  })
  it('returns a header with the correct heading (element, attrs and text)', () => {
    expect(header.querySelector('div.header>h1').textContent).toMatch(/foo/i)
  })
  it('returns a header with the correct date (element, attrs and text)', () => {
    expect(header.querySelector('span.date').textContent).toMatch(/bar/i)
  })
  it('returns a header with the correct temperature (element, attrs and text)', () => {
    expect(header.querySelector('span.temp').textContent).toMatch(/baz/i)
  })
})

describe('headerAppender', () => {
  beforeEach(() => {
    headerAppender('body')
  })

  it('appends the header to the DOM', () => {
    expect(document.querySelector('div.header>h1').textContent).toBeTruthy()
    expect(document.querySelector('span.date').textContent).toBeTruthy()
    expect(document.querySelector('span.temp').textContent).toBeTruthy()
  })
})
