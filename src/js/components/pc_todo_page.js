import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Layout,
  Menu,
  Icon,
  Card } from 'antd';
import CardToDoItem from './cards/cards_todo_item';
import { setData, setCollapsed } from '../actions';

const { Meta } = Card;
const { Header, Sider, Content } = Layout;
/* eslint-disable */
class PcToDoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      myTodoList: []
    };
    this.changeMenu = this.changeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.setLike = this.setLike.bind(this);
    this.setDel = this.setDel.bind(this);
    this.setDid = this.setDid.bind(this);
    this.addCards = this.addCards.bind(this);
  }
  componentDidMount() {
    this.setState({
      myTodoList: this.props.dataLists.todoList,
      collapsed: this.props.collaspeState.collapsed
    });
  }
  setLike(cardId, likeFlag) {
    const { dispatch } = this.props;
    if (!likeFlag) {
      dispatch(setData('ADD', 'LIKE', cardId));
    } else {
      dispatch(setData('DELETE', 'LIKE', cardId));
    }
    this.setState({
      myTodoList: this.props.dataLists.todoList
    });
  }
  setDel(cardId) {
    const { dispatch } = this.props;
    dispatch(setData('DELETE', 'TODO', cardId));
    this.setState({
      myTodoList: this.props.dataLists.todoList
    });
  }
  setDid(cardId) {
    const { dispatch } = this.props;
    dispatch(setData('ADD', 'DID', cardId));
    this.setState({
      myTodoList: this.props.dataLists.todoList
    });
  }
  changeMenu(e) {
    if (e.key === 'tag') {
      this.props.history.push('/did');
    } else if (e.key === 'heart') {
      this.props.history.push('/like');
    } else if (e.key === 'plus') {
      this.props.history.push('/add');
    }
  }
  toggleMenu() {
    this.setState({
      collapsed: !this.state.collapsed
    });
    const { dispatch } = this.props;
    dispatch(setCollapsed());
  }
  addCards() {
    this.props.history.push('/add');
  }
  render() {
    const needToDoList = [];
    this.state.myTodoList.map((item) => {
      if (!item.is_did) {
        needToDoList.push(item);
      }
    });
    return (
      <Layout className="pc_main_page">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['form']} onClick={this.changeMenu}>
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
            {
              needToDoList.length > 0
              ?
              <span>
                {
                  needToDoList.map((card, index) => {
                    return <CardToDoItem {...card} key={index} handleLike={this.setLike} handleDelete={this.setDel} handleDid={this.setDid} />;
                  })
                }
                <span>
                  <Card hoverable className="addBoxCard" onClick={this.addCards}>
                    <Meta description='好记性不如烂笔头，添加个备忘吧！' />
                  </Card>
                </span>
              </span>
              :
              <span>
                <Card hoverable className="addBoxCard" onClick={this.addCards}>
                  <Meta description='好记性不如烂笔头，添加个备忘吧！' />
                </Card>
              </span>
            }
          </Content>
        </Layout>
      </Layout>
    );
  }
}
function getInitData(state) {
  return {
    dataLists: state.dataLists,
    collaspeState: state.collaspeState
  };
}
// export default connect(state => ({ todoListData: state.todoListData, didListData: state.didListData, likeListData: state.likeListData }))(PcToDoPage);
export default connect(getInitData)(PcToDoPage);
