// 纯事件定义
export const DELETETODO = 'DELETETODO';
export const ADDTODO = 'ADDTODO';

export const DELETEDID = 'DELETEDID';
export const ADDDID = 'ADDDID';

export const DELETELIKE = 'DELETELIKE';
export const ADDLIKE = 'ADDLIKE';

export const COLLAPSE = 'COLLAPSE';

export function setData(handler, event, parms) {
  const handlerType = `${handler}${event}`;
  return {
    type: handlerType,
    payload: parms
  };
}
export function setCollapsed() {
  return {
    type: COLLAPSE
  };
}
