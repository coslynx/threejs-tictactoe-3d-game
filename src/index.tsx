import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import '@/styles/tailwind.css'
import App from '@/App'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element with ID "root" not found')
}

const root = ReactDOM.createRoot(rootElement)

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} catch (error) {
  console.error('Application failed to initialize:', error)
  console.error('Error Stack Trace:', error.stack)
  alert(
    'Application failed to load. Please check the console for errors.'
  )
  root.render(
    <div>
      Application failed to load. Please check the console for errors.
    </div>
  )
}