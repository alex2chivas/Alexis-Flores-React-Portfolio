import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom'
import axios from 'axios';

import BlogItem from '../blog/blog-item';

class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true
        };

        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this); // Note this.onScroll() // We can call it since we need to have it activity at all times // Note // this is for Element.scrollTop = document.documentElement.scrollTop                                
        window.addEventListener("scroll", this.onScroll, false) // Note // Make sure I pay attention for memory leak and use the lifecylce hooks  
    }

    onScroll() {
        if( this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {
            return;
        }    

        if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            this.getBlogItems()
        }
    }

    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1
        })
        axios.get(`https://alexisflores.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, //  Note // This is for a page parameter 
        {
            withCredentials: true
        }).then(response => { // Note // reponse.data.meta.total_records // This will let us know how many record are actually in API request
            console.log("getting", response.data)
            this.setState({ 
                blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
                totalCount: response.data.meta.total_records,
                isLoading: false
            })
        }).catch(error => {
            console.log("getBlogItems error", error)
        })
    }

    componentDidMount(){
        this.getBlogItems()
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false)
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
                
                {this.state.isLoading ? ( 
                <div className="content-loader">
                    <FontAwesomeIcon icon="spinner" spin/>
                </div>
                ) : null}
            </div>
        )
    };
}

export default Blog;