import React from 'react';
import { createRoot } from 'react-dom/client';
// The webpack.resolve.alias setting in webpack.config.js aliases '@' to 'client/src', so that all
// the import paths can start from there, instead of being relative to the current file.
import App from '@/components/App/App';

const root = createRoot(document.querySelector('.root'));
root.render(<App />);
