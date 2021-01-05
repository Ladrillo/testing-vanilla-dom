// This is for the fake API. Do not delete!
import { rest } from 'msw'
import { topics, articles } from './data'


function getTopics(req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json(topics),
  )
}

function getArticles(req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json(articles),
  )
}

export const handlers = [
  rest.get('https://www.lambdatimes.com/api/articles', getArticles),
  rest.get('https://www.lambdatimes.com/api/topics', getTopics),
]
