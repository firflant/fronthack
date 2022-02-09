import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import enableServiceWorker from './enableServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

enableServiceWorker()
