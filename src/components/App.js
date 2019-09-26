import React, { Component } from 'react';
import axios from 'axios'
import Posts from './Post/Post'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(res => {
      this.setState({
        posts: res.data
      })
    console.log('Success')
    // alert('Success')
    })
    .catch(err => {
      console.log(err)
      alert('Failed')
    })

  }

  updatePost(id, text) {
    console.log(id,text)
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}` , { text })
    .then( results => {
    this.setState({
      posts: results.data
    })
    })
    .catch(err => {
      console.log(err)
    })
  }

  deletePost(id) {
    axios.delete(`https:practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', {text})
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
    .catch(err => {console.log(err)})
  }

  render() {
    const { posts } = this.state;
    // console.log(posts)

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
            createPostFn={this.createPost}
            />
          {
            posts.map( element => (
              <Posts 
                key={element.id}
                text={element.text} 
                date={element.date}
                updatePostFn={this.updatePost}
                id={element.id}
                deletePostFn={this.deletePost}
                
                />
            ))

          }
          
        </section>
      </div>
    );
  }
}

export default App;
