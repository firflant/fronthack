import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import enableServiceWorker from './enableServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

enableServiceWorker()
