import React, { Component } from 'react';

import BlogActions from '../actions/BlogActions';

export default class PostPage extends Component {
  constructor () {
    super();

    this.state = {
      title: '',
      author: '',
      content: ''
    };

    this._grabTitle = this._grabTitle.bind(this);
    this._grabAuthor = this._grabAuthor.bind(this);
    this._grabContent = this._grabContent.bind(this);
    this._addNewPost = this._addNewPost.bind(this);
  }

  _grabTitle (e) {
    let input = e.target.value;
    this.setState({
      title: input
    });
  }

  _grabAuthor (e) {
    let input = e.target.value;
    this.setState({
      author: input
    });
  }

  _grabContent (e) {
    let input = e.target.value;
    this.setState({
      content: input
    });
  }

  _addNewPost (e) {
    e.preventDefault();
    let { title, author, content } = this.state;
    let newPostPackage = {
      title,
      author,
      content
    };
    BlogActions.sendNewPost(newPostPackage);
  }

  render () {
    return (
      <div>
        <h1 className='text-center'>New Post</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='titleInput'>Title: </label>
            <input className='form-control' id='titleInput' onChange={this._grabTitle} placeholder='Insert Title of Post' />
          </div>
          <div className='form-group'>
            <label htmlFor='authorInput'>Author: </label>
            <input className='form-control' id='authorInput' onChange={this._grabAuthor} placeholder='Insert Author of Post' />
          </div>
          <textarea className='form-control' rows='3' onChange={this._grabContent}></textarea>
          <button type='submit' className='btn btn-default' onClick={this._addNewPost}>Submit</button>
        </form>
      </div>
    );
  }
}
