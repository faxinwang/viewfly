import 'reflect-metadata'

import App from './App'

import './index.css'

import { createApp } from '@viewfly/platform-browser'

const el = document.getElementById('root')
if (!el) {
  throw new Error('missing #root')
}

const app = createApp(<App />).mount(el)

if (import.meta.hot) {
  import.meta.hot.dispose(() => app.destroy())
}
