import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';


class Blog extends Component {
    state = {
        posts: [], //We create a state with an empty array of posts
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => { //We get the posts with a promise from the api data
                const posts = response.data.slice(0, 4); //We store just 4 posts in this const
                const updatedPosts = posts.map(post => { //We transform the posts by adding another propetry
                    return { //Foreach post we return an object
                        ...post, //We copy what the object has
                        author: "Max" //and We add the new one
                    }
                })
                this.setState({ posts: updatedPosts }); //we set our posts state to the response.data(Posts from the api)
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id })
    }

    render() {
        let posts = <p>Something went wrong</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => { //We create a const with posts from the state and we map to create an <Post for each of them/>
                return <Post
                    title={post.title}
                    key={post.id}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
            }
            );
        }


        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;