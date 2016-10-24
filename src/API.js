import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  receiveBlogPosts () {
    axios.get('/api/blog')
      .then((res) => {
        ServerActions.receiveBlogPosts(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.receiveBlogPosts', err);
      });
  },

  sendNewPost (newPostPackage) {
    axios.post('/api/blog', newPostPackage)
      .catch((err) => {
        console.log('ERROR! API.sendNewPost', err);
      });
  },

  deletePost (id) {
    axios.delete(`/api/blog/${id}`)
      .then(this.receiveBlogPosts)
      .catch((err) => {
        console.log('ERROR! API.deletePost', err);
      });
  },

  updatePost (id, updatedPost) {
    axios.put(`/api/blog/${id}`, updatedPost)
      .then(this.receiveBlogPosts)
      .catch((err) => {
        console.log('ERROR! API.updatePost', err);
      });
  }
};

export default API;
