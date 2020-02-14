import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom'
import axios from 'axios';

import BlogItem from '../blog/blog-item';
import BlogModal from '../modals/blog-modal'

class Blog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalisOpen: false
        };

        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this); // Note this.onScroll() // We can call it since we need to have it activity at all times // Note // this is for Element.scrollTop = document.documentElement.scrollTop                                
        window.addEventListener("scroll", this.onScroll); // Note // Make sure I pay attention for memory leak and use the lifecylce hooks  
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleSuccessNewBlogSubmission = this.handleSuccessNewBlogSubmission.bind(this)
    }

    // NoteOne // This is a gradParent folder coming from granchild blog-form data
    handleSuccessNewBlogSubmission(blog) { 
        this.setState({
            blogItems: [blog].concat(this.state.blogItems), // Example // const one = [1,2,3]; const two = 0; const newArray = [two].concat(one); newArray - output - [0,1,2,3]
            blogModalisOpen: false, 
        })
    }

    handleModalClose(){
        this.setState({
            blogModalisOpen: false
        })
    }

    handleModalOpen () {
        this.setState({
            blogModalisOpen: true
        })
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
            this.setState({ 
                blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
                totalCount: response.data.meta.total_records,
                isLoading: false,
            })
        }).catch(error => {
            console.log("getBlogItems error", error)
        })
    }

    componentDidMount(){
        this.getBlogItems()
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll)
    }

    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
            return <BlogItem key={blogItem.id} blogItem={blogItem}/>
        })
        return (
            <div className="blog-container">
                <BlogModal 
                handleSuccessNewBlogSubmission={this.handleSuccessNewBlogSubmission}
                modalIsopen={this.state.blogModalisOpen}
                handleModalClose={this.handleModalClose}
                />

                { this.props.loggedInStatus === "LOGGED_IN" ? 
                    <div className="new-blog-link">
                        <a onClick={this.handleModalOpen}>
                            <FontAwesomeIcon icon="plus-square"/>
                        </a>
                    </div>
                :
                null}

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