// Do not touch this file
import 'regenerator-runtime'
import { cardAppender } from './components/card'
import { worker } from './mocks/browser'

worker.start()

cardAppender('.cards-container')
