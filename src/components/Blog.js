import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
  const [showAll, setShowAll] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingRight: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    paddingBottom: 5,
    width: "fit-content",
  };

  const addLike = async () => {

    const idToUpdate = blog.id

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    const returnedBlog = await blogService.update(idToUpdate, blogObject);

    setBlogs(blogs.map((blog) => 
    blog.id !== idToUpdate ? blog : returnedBlog))

  };

  if (showAll) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setShowAll(false)}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes}
          <button onClick={() => addLike()}>like</button>
          <br />
          {blog.author}
        </div>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setShowAll(true)}>view</button>
        </div>
      </div>
    );
  }
};

export default Blog;
