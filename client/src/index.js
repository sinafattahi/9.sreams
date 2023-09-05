import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import reduxThunk from 'redux-thunk'

import App from './components/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
  );

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="783481020528-qilj323rl48qb2lo1qvhpn4schvlt4cc.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>
  </Provider>
  ,
  document.querySelector('#root')
);
