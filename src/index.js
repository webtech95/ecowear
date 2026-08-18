import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CartProvider from './features/cart/cartContext';
import store from './app/store';
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from './components/navigation/ScrollToTop';
import { HelmetProvider  } from 'react-helmet-async';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <HelmetProvider >
          <App />
          </HelmetProvider >
        </BrowserRouter>
      </CartProvider>
    </Provider>
  </React.StrictMode>
);

