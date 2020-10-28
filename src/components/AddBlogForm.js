import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const AddBlogForm = ({
  setMessage,
  setBlogs,
  blogs,
  setAddBlogFormVisible,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    const returnedBlog = await blogService.create(blogObject);

    //doesn't set error message
    try {
      setBlogs(blogs.concat(returnedBlog));
      setMessage(`a new blog ${title} by ${author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
      setAddBlogFormVisible(false);
    } catch (exception) {
      setMessage("blog form invalid");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

AddBlogForm.propTypes = {
  setMessage: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setAddBlogFormVisible: PropTypes.func.isRequired,
};

export default AddBlogForm;
