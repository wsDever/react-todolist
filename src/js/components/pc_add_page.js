import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Layout,
  message,
  Menu,
  Icon,
  Input } from 'antd';
import { setData, setCollapsed } from '../actions';

const { Header, Sider, Content } = Layout;
class PcAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      defTime: '',
      defTitle: '备忘事项',
      defContent: ''
    };
    this.clearInput = this.clearInput.bind(this);
    this.addLists = this.addLists.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changeMenu = this.changeMenu.bind(this);
  }
  /* eslint-disable */
  componentDidMount() {
    const today = new Date();
    let day = today.getDate() + 2;
    day = day > 9 ? day : `0${day}`;
    let month = today.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    const year = today.getFullYear();
    this.setState({
      defTime: `${year}-${month}-${day}`,
      collapsed: this.props.collaspeState.collapsed
    });
  }
  changeMenu(e) {
    if (e.key === 'tag') {
      this.props.history.push('/did');
    } else if (e.key === 'heart') {
      this.props.history.push('/like');
    } else if (e.key === 'form') {
      this.props.history.push('/');
    }
  }
  toggleMenu() {
    this.setState({
      collapsed: !this.state.collapsed
    });
    const { dispatch } = this.props;
    dispatch(setCollapsed());
  }
  clearInput() {
    this.setState({
      defContent: ''
    });
  }
  changeTime(e) {
    const val = e.target.value;
    this.setState({
      defTime: val
    });
  }
  changeTitle(e) {
    const val = e.target.value;
    this.setState({
      defTitle: val
    });
  }
  changeContent(e) {
    const val = e.target.value;
    this.setState({
      defContent: val
    });
  }
  addLists(e) {
    const { dispatch } = this.props;
    if (!(this.state.defTime && this.state.defTitle && this.state.defContent)) {
      e.preventDefault();
    }
    let mydo = Object.assign({
      card_time: this.state.defTime,
      card_title: this.state.defTitle,
      card_desc: this.state.defContent
    });
    mydo = JSON.stringify(mydo);
    dispatch(setData('ADD', 'TODO', mydo));
    this.clearInput();
    message.config({
      top: 40
    });
    message.info('添加成功！');
  }
  render() {
    return (
      <Layout className="pc_main_page">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['plus']} onClick={this.changeMenu}>
            <Menu.Item key="form">
              <Icon type="form" />
              <span>待办</span>
            </Menu.Item>
            <Menu.Item key="tag">
              <Icon type="tag" />
              <span>已办</span>
            </Menu.Item>
            <Menu.Item key="plus">
              <Icon type="plus-square" />
              <span>添加</span>
            </Menu.Item>
            <Menu.Item key="heart">
              <Icon type="heart" />
              <span>收藏</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="layoutHeader">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggleMenu}
            />
          </Header>
          <Content className="layoutContent">
            <div className="inputBox">
              <Input addonBefore="时间" onChange={this.changeTime} value={this.state.defTime} />
            </div>
            <div className="inputBox">
              <Input addonBefore="标题" onChange={this.changeTitle} value={this.state.defTitle} />
            </div>
            <div className="inputBox">
              <Input addonBefore="事项" onChange={this.changeContent} value={this.state.defContent} />
            </div>
            <div className="inputBox btnLine">
              <button onClick={this.clearInput}>清空</button>
              <button onClick={this.addLists}>确定</button>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
function getInitData(state) {
  return {
    collaspeState: state.collaspeState
  };
}
// export default connect(state => ({ todoListData: state.todoListData, didListData: state.didListData, likeListData: state.likeListData }))(PcAddPage);
export default connect(getInitData)(PcAddPage);
