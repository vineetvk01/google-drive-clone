import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import { ToastProvider } from 'react-toast-notifications';
import App from './containers/App';
import ReduxWrapper from './store/index';

import 'bootstrap/dist/css/bootstrap.min.css';

dotenv.config();


const AppWrapper = () => {
  return (
    <>
      <ReduxWrapper>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ReduxWrapper>
    </>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
