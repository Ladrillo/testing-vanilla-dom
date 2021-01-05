// Do not touch this file
import 'regenerator-runtime'
import { CardAppender } from './components/card'
import { worker } from './mocks/browser'

worker.start()

CardAppender('.cards-container')
