import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

export default class PcHeader extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      current: 'appstore'
    };
  }
  handleClick(event) {
    // this.setState({
    //   current: event.key
    // })
  }
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="appstore">
          <Icon type="appstore" />待办
        </Menu.Item>
        <Menu.Item key="tag">
          <Icon type="tag" />已完成
        </Menu.Item>
        <Menu.Item key="form">
          <Icon type="form" />添加
        </Menu.Item>
        <Menu.Item key="heart">
          <Icon type="heart" />收藏
        </Menu.Item>
      </Menu>
    );
  }
}

