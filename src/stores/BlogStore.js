import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';
import * as types from '../actions/actionTypes';
import moment from 'moment';

let _posts = [];

class BlogStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case types.RECEIVE_BLOG_POSTS: {
          let { blogPosts } = action.payload;
          let sortedBlogPosts = blogPosts.sort((a, b) => {
            let unixA = moment(a.createdAt).unix();
            let unixB = moment(b.createdAt).unix();
            return unixB - unixA;
          });
          _posts = sortedBlogPosts;
          this.emit('CHANGE');
        } break;
      }
    });
  }

  startListening (cb) {
    this.on('CHANGE', cb);
  }

  stopListening (cb) {
    this.removeListener('CHANGE', cb);
  }

  getBlogPosts () {
    return _posts;
  }
}

export default new BlogStore();
