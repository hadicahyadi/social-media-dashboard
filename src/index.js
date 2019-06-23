import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Modal from 'react-modal';

import Button from '@material-ui/core/Button';

import App from './App'
// inject react-modal into DOM
Modal.setAppElement('#app');

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
