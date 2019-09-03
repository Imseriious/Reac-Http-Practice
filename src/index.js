import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

axios.interceptors.request.use(requestConfig => {
    console.log(requestConfig);
    return requestConfig; //We always need to return so we can use it locally from components
}, error => {
    console.log(error);
    return Promise.reject(error); //Need to return
});

axios.interceptors.response.use(response => {
    console.log(response);
    return response; //We always need to return so we can use it locally from components
}, error => {
    console.log(error);
    return Promise.reject(error); //Need to return
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
