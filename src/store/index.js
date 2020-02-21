import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import RootReducer from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  RootReducer, 
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, logger)
  )
)

sagaMiddleware.run(sagas);

export default store
