import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/kit.css'
import './styles/app.css'
import './styles/city.css'
import './styles/mesh.css'
import './styles/graph.css'
// Last: the shell owns layout and the shared atoms every view builds on.
import './styles/shell.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
