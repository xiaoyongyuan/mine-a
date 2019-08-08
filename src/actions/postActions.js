import { Earth } from './types';

// 分发操作


export const ChangeEarth = postData => dispatch => {
  dispatch({
    type: Earth,
    payload: postData
  })
}

