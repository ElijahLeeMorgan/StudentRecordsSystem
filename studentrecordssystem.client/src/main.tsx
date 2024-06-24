import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ThemeContextProvider from './context/theme.context.tsx'
import { BrowserRouter } from 'react-router-dom'
import './global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeContextProvider>,
)
