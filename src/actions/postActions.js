import { TOW_POST, NEW_POST } from './types';

// 分发操作


export const createPost = postData => dispatch => {
  dispatch({
    type: NEW_POST,
    payload: postData
  })
}

export const goba = postData => dispatch => {
  dispatch({
    type: TOW_POST,
    payload: postData
  })
}