//@ts-ignore
import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './App';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>
);
