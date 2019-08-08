import { Earth } from '../actions/types';
// reducer的作用: 返回新的状态

const initialState = {
  items: [],
  item: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Earth:
      return {
        ...state,
        item: action.payload
      }
    default:
      return state;
  }
}