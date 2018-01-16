// Entry Point
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
import App from './components/App';
import { persistStore } from 'redux-persist';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react'
import {createOnStorage} from './middleware';

let {persistor, store} = configureStore()

// let persistor = persistStore(store)
// var container = typeof document === 'undefined' ? null : document.querySelector('.container');
// persistStore(store, {}, () => {



if(typeof window !== 'undefined') { 
  const onStorage = createOnStorage(store);
  // listen to local storage events for new actions
  window.addEventListener('storage', onStorage)
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading </div>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    , document.querySelector('.container')
  );
}
// })
//https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
