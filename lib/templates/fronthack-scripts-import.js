
// Fronthack development script. If you remove it, you will loose the ability
// to use a Fronthack development tools: design overlay and canvas.
(process.env.NODE_ENV === 'development') && import('fronthack-scripts');