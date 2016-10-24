import API from '../API';

const BlogActions = {
  sendNewPost (newPostPackage) {
    API.sendNewPost(newPostPackage);
  },

  deletePost (id) {
    API.deletePost(id);
  },

  updatePost (id, updatedPost) {
    API.updatePost(id, updatedPost);
  }
};

export default BlogActions;
