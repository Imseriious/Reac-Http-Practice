import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';


class Blog extends Component {
    state = {
        posts: [] //We create a state with an empty array of posts
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => { //We get the posts with a promise from the api data
                const posts = response.data.slice(0, 4); //We store just 4 posts in this const
                const updatedPosts = posts.map(post => { //We transform the posts by adding another propetry
                    return { //Foreach post we return an object
                        ...post, //We copy what the object has
                        author: "Max" //and We add the new one
                    }
                })
                this.setState({ posts: updatedPosts }); //we set our posts state to the response.data(Posts from the api)
            });
    }

    render() {
        const posts = this.state.posts.map(post => { //We create a const with posts from the state and we map to create an <Post for each of them/>
            return <Post title={post.title} key={post.id} author={post.author}/>
        }
        );

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;