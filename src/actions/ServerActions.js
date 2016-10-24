import AppDispatcher from '../AppDispatcher';
import * as types from '../actions/actionTypes';

const ServerActions = {
  receiveBlogPosts (blogPosts) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_BLOG_POSTS,
      payload: { blogPosts }
    });
  }
};

export default ServerActions;
