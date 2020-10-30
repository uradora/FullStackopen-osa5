import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, user, addLike }) => {
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

  /*
  const addLike = async () => {
    const idToUpdate = blog.id;

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    const returnedBlog = await blogService.update(idToUpdate, blogObject);

    setBlogs(
      blogs.map((blog) => (blog.id !== idToUpdate ? blog : returnedBlog))
    );
  };
  */

  const removeBlog = async () => {
    const idToRemove = blog.id;

    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) {
      await blogService.remove(idToRemove);
      setBlogs(blogs.filter((b) => b.id !== idToRemove));
    }
  };

  const removeButtonVisible = {
    display: blog.user && blog.user.username === user.username ? "" : "none",
  };

  //only after refresh, this correctly identifies recently added blog's blog.user.username
  //gottaFindUserbyId i guess if I want to fix this

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
          <button onClick={() => addLike(blog)}>like</button>
          <br />
          {blog.author}
          <br />
          {blog.url}
          <br />
          <div style={removeButtonVisible}>
            <button onClick={() => removeBlog()}>remove</button>
          </div>
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
