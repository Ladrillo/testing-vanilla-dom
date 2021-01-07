import 'regenerator-runtime'
import '@testing-library/jest-dom/extend-expect'
import fetch from 'node-fetch'

globalThis.fetch = fetch

import { screen } from '@testing-library/dom'
import { server } from './src/mocks/server'
import { Card, cardAppender } from './src/components/card'
import { Header, headerAppender } from './src/components/header'
import { articles } from './src/mocks/data'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => {
  server.resetHandlers()
  document.body.innerHTML = ''
})

describe('TASK 1 - Header', () => {
  let header
  beforeEach(() => {
    header = Header('foo', 'bar', 'baz')
  })
  it('returns a header with the correct heading (element, attrs and text)', () => {
    expect(header.querySelector('div.header>h1').textContent).toMatch(/foo/i)
  })
  it('returns a header with the correct date (element, attrs and text)', () => {
    expect(header.querySelector('div.header>span.date').textContent).toMatch(/bar/i)
  })
  it('returns a header with the correct temperature (element, attrs and text)', () => {
    expect(header.querySelector('div.header>span.temp').textContent).toMatch(/baz/i)
  })
})

describe('TASK 2 - headerAppender', () => {
  beforeEach(() => {
    headerAppender('body')
  })
  it('appends the header to the DOM', () => {
    expect(document.querySelector('.header>h1')).toBeTruthy()
    expect(document.querySelector('.header>.date')).toBeTruthy()
    expect(document.querySelector('.header>.temp')).toBeTruthy()
  })
})

describe('TASK 5 - Card', () => {
  let card
  beforeEach(() => {
    card = Card(articles.articles.javascript[0])
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
      .toBe(articles.articles.javascript[0].authorPhoto)
  })
})

describe('TASK 6 - cardAppender', () => {
  let flattened = Object.values(articles.articles).flat()
  beforeEach(() => {
    cardAppender('body')
  })
  it('appends all the articles', async () => {
    const headlines = flattened.map(art => art.headline)
    for (let i = 0; i < headlines.length; i++) {
      expect(await screen.findByText(headlines[i])).toBeInTheDocument()
    }
  })
})
