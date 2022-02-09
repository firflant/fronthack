import { Workbox } from 'workbox-window'

export default function() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const wb = new Workbox('/service-worker.js')

      // Fires when the registered service worker has installed but is waiting to activate.
      wb.addEventListener('waiting', event => {
        if (window.confirm('New version of the site is available. Do you want to reload the view?')) {
          // Set up a listener that will reload the page as soon as the previously waiting service worker has taken control.
          wb.addEventListener('controlling', event => {
            window.location.reload()
          })

          // Send a message telling the service worker to skip waiting.
          // This will trigger the `controlling` event handler above.
          wb.messageSW({ type: 'SKIP_WAITING' })
        }
      })

      wb.register()
    })
  }
}
