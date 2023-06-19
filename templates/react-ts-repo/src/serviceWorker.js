workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting()
  }
})
