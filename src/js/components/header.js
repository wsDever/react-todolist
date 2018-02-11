import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCount } from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.MyaddCount = this.MyaddCount.bind(this);
  }
  MyaddCount() {
    console.log(`点击前：${this.props.count}`);
    const { dispatch } = this.props;
    setTimeout(() => {
      dispatch(addCount());
      console.log(`点击后：${this.props.count}`);
    }, 500);
  }
  render() {
    return (
      <header>
        <h3>{this.props.title}</h3>
        <button onClick={this.MyaddCount}>Add</button>
        <div>{`当前值：${this.props.count}，打开F12查看`}</div>
      </header>
    );
  }
}
// function select(state) {
//   return {
//     count: state.count
//   };
// }
export default connect(state => ({ count: state.count }))(Header);
