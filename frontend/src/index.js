import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { Provider } from 'react-redux';
import {store} from './store/store';
import './index.css';

ReactDOM.render(
<Provider store={store}>
  <Root />
</Provider>
, document.getElementById('root'))