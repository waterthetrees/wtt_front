import React from 'react';
import ReactDOM from 'react-dom';
// The webpack.resolve.alias setting in webpack.config.js aliases '@' to 'client/src', so that all
// the import paths can start from there, instead of being relative to the current file.
import App from '@/components/App/App';

ReactDOM.render(<App />, document.querySelector('.root'));
