import React, { Component } from 'react'
import axios from 'axios';

import BlogItem from '../blog/blog-item';

class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: []
        };

        this.getBlogItems = this.getBlogItems.bind(this);
        this.activateInfiniteScroll(); // Note // We can call it since we need to have it activity at all times // Note // this is for Element.scrollTop = document.documentElement.scrollTop                                
    }

    activateInfiniteScroll() {
        window.onscroll = () => {
            console.log("window.innerHeight", window.innerHeight)
            console.log("document.documentElement.scrollTop", document.documentElement.scrollTop)
            console.log("document.documentElement.offset", document.documentElement.offsetHeight)

            if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                console.log("get more post")
            }
        }
    }

    getBlogItems() {
        axios.get("https://alexisflores.devcamp.space/portfolio/portfolio_blogs", 
        {
            withCredentials: true
        }).then(response => {
            this.setState({
                blogItems: response.data.portfolio_blogs
            })
        }).catch(error => {
            console.log("getBlogItems error", error)
        })
    }

    componentDidMount(){
        this.getBlogItems()
    }

    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
            return <BlogItem key={blogItem.id} blogItem={blogItem}/>
        })
        return (
            <div className="blog-container">
                <div className='content-container'> 
                    {blogRecords}
                </div>
            </div>
        )
    };
}

export default Blog;