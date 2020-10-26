import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingRight: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    paddingBottom: 5,
    width: "fit-content"
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
          <button>like</button>
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
