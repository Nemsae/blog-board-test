import React, { Component } from 'react';
import moment from 'moment';

import BlogStore from '../stores/BlogStore';
import BlogActions from '../actions/BlogActions';
import API from '../API';

export default class Home extends Component {
  constructor () {
    super();

    this.state = {
      posts: BlogStore.getBlogPosts()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    API.receiveBlogPosts();
    BlogStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    BlogStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      posts: BlogStore.getBlogPosts()
    });
  }

  _deletePost (id) {
    BlogActions.deletePost(id);
  }

  _updatePost (post) {
    let id = post._id;
    let udpatedPostPackage = {
      title: this.refs[post.title].value,
      author: this.refs[post.author].value,
      content: this.refs[post._id].value
    };
    BlogActions.updatePost(id, udpatedPostPackage);
  }

  render () {
    let { posts } = this.state;
    return (
      <div className='text-center'>
        <h1>Welcome to my Blog!</h1>
        {
          posts.map((post) => {
            let time = moment(post.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');

            return (
              <div className='col-xs-12' key={post._id}>
                <h2>{post.title}</h2>
                <h4>Written by: {post.author} on {time}</h4>
                <p>{post.content}</p>
                <button className='btn btn-primary updateButton' data-toggle='modal' data-target={`#modal${post._id}`}>Edit</button>

                <div className='modal fade' id={`modal${post._id}`} tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
                  <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                          <span aria-hidden='true'>&times;</span>
                        </button>
                        <h4 className='modal-title' id='myModalLabel'>Edit Post</h4>
                      </div>
                      <div className='modal-body'>
                        <input className='col-xs-12' type='text' ref={post.title} defaultValue={post.title} />
                        <input className='col-xs-12' type='text' ref={post.author} defaultValue={post.author} />
                        <textarea className='col-xs-12' rows='3' type='text' ref={post._id} defaultValue={post.content} />
                        {/* <textarea className='form-control' rows='3' onChange={this._grabContent}></textarea> */}
                      </div>
                      <div className='modal-footer'>
                        <button type='button' className='btn btn-danger' data-dismiss='modal' onClick={this._deletePost.bind(this, post._id)}>Delete</button>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal'>Cancel Edit</button>
                        <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={this._updatePost.bind(this, post)}>Update Post</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
