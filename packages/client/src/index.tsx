import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
    <StrictMode>
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
        />
        <App />
    </StrictMode>
);
