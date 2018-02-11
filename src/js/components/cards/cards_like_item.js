import React, { Component } from 'react';
import {
  Modal,
  Button,
  Icon,
  Card,
  Avatar } from 'antd';

const { Meta } = Card;
export default class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      liked: this.props.is_liked
    };
    this.showCard = this.showCard.bind(this);
    this.setLike = this.setLike.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.setDel = this.setDel.bind(this);
  }
  setLike() {
    this.setState({
      liked: !this.state.liked
    });
    this.props.handleLike(this.props.card_id, this.state.liked);
  }
  setDel() {
    this.props.handleDelete(this.props.card_id);
  }
  showCard() {
    this.setState({
      visible: true
    });
  }
  handleOk() {
    this.setState({
      visible: false
    });
  }
  render() {
    const titleHtml = (
      <span>
        <span className="cardTitle">{this.props.card_title}</span>
        <span className="cardTime">{this.props.card_time}</span>
      </span>
    );
    return (
      <span className="component_card_item">
        <Card
          className="contentCard"
          actions={[<Icon type={this.state.liked ? 'heart' : 'heart-o'} onClick={this.setLike} />, <Icon type="delete" onClick={this.setDel} />, <Icon type="desktop" onClick={this.showCard} />]}
        >
          <Meta
            avatar={<Avatar src={this.props.card_pic} />}
            title={titleHtml}
            description={this.props.card_desc}
          />
        </Card>
        <Modal
          visible={this.state.visible}
          title="详情"
          onOk={this.handleOk}
          onCancel={this.handleOk}
          destroyOnClose
          wrapClassName="myCardBox"
          footer={[
            <Button type="primary" onClick={this.handleOk}>
              确认
            </Button>
          ]}
        >
          <p>创建时间：<span>{this.props.card_time}</span></p>
          <p>详细内容：<span>{this.props.card_desc}</span></p>
        </Modal>
      </span>
    );
  }
}
