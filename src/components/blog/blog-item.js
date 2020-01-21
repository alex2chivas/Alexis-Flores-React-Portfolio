import React from 'react';

const BlogItem = props => {
  const {
    id,
    title,
    content,
    blog_status,
    featured_image_url
  } = props.blogItem;

  return (
    <div>
      <h1>
        {title}
      </h1>
      <div>
        {content}
      </div>
    </div>
  )
}

export default BlogItem;