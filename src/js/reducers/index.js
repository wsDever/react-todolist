import { combineReducers } from 'redux';
import { DELETETODO, ADDTODO, DELETEDID, ADDDID, DELETELIKE, ADDLIKE, COLLAPSE } from '../actions';
// store中可以定义页面中的初始状态
const initialState = {
  collapsed: false,
  todoList: [{
    card_pic: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    card_time: '2017-12-23',
    card_title: '实例',
    card_desc: '这是一个测试的例子，可以删除，真的可以删除！',
    is_liked: false,
    is_did: false,
    card_id: '001'
  }]
};
/* eslint-disable */
// todoListData的初始状态以及处理之后返回的state值
function dataLists(state = initialState, action) {
  let curIdx = 0;
  let newItem = {};
  switch (action.type) {
    case DELETETODO:
      state.todoList.map((item, idx) => {
        if (item.card_id === action.payload) {
          curIdx = idx;
        }
      });
      state.todoList.splice(curIdx, 1);
      return state;
    case ADDTODO:
      const timestamp = Date.parse(new Date());
      const temp = JSON.parse(action.payload);
      newItem = Object.assign({
        card_pic: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        is_liked: false,
        is_did: false,
        card_id: timestamp,
        card_time: temp.card_time,
        card_title: temp.card_title,
        card_desc: temp.card_desc
      });
      state.todoList.push(newItem);
      return state;
    case DELETEDID:
      return {

      };
    case ADDDID:
      state.todoList.map((item, idx) => {
        if (item.card_id === action.payload) {
          item.is_did = true;
          newItem = item;
          curIdx = idx;
        }
      });
      state.todoList[curIdx] = newItem;
      return state;
    case DELETELIKE:
      state.todoList.map((item, idx) => {
        if (item.card_id === action.payload) {
          item.is_liked = false;
          newItem = item;
          curIdx = idx;
        }
      });
      state.todoList[curIdx] = newItem;
      return state;
    case ADDLIKE:
      state.todoList.map((item, idx) => {
        if (item.card_id === action.payload) {
          item.is_liked = true;
          newItem = item;
          curIdx = idx;
        }
      });
      state.todoList[curIdx] = newItem;
      return state;
    default:
      return state;
  }
}
function collaspeState(state = initialState, action) {
  const tempState = state.collapsed;
  if (action.type === COLLAPSE) {
    state.collapsed = !tempState;
  }
  return state;
}
const todoDataSource = combineReducers({
  dataLists,
  collaspeState
});
export default todoDataSource;
