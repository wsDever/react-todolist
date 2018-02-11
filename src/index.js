import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import 'antd/dist/antd.css';
import reducers from './js/reducers';
import PcMainPage from './js/components/pc_todo_page';
import PcDidPage from './js/components/pc_did_page';
import PcLikePage from './js/components/pc_like_page';
import PcAddPage from './js/components/pc_add_page';

import './static/app.less';
/* eslint-disabled */
class Index extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={PcMainPage} />
          <Route path="/did" exact component={PcDidPage} />
          <Route path="/like" exact component={PcLikePage} />
          <Route path="/add" exact component={PcAddPage} />
        </Switch>
      </HashRouter>
    );
  }
}
// 不使用redux
// ReactDom.render(<Index />, document.getElementById("myApp"));
// 使用redux
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
ReactDom.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Index />
  </Provider>,
  document.getElementById('myApp')
);
