import { DevTools, loadServer } from "jira-dev-tool";
import App from 'App';
import { AppProviders } from 'context';

// 务必在jira-dev-tool后面引入,因为dev里面有样式，我们需要用antd覆盖他
import 'antd/dist/antd.less';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "./wdyr";

// import { AppProviders } from "context";



loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>

    </React.StrictMode>,
    document.getElementById("root")
  )
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


