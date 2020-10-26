import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import AddBlogForm from "./components/AddBlogForm";

const App = () => {
  const [addBlogFormVisible, setAddBlogFormVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setMessage("wrong credentials");
      console.log(message);
      setTimeout(() => {
        console.log(message);
        console.log("wtf");
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    setUser(null);
    window.localStorage.removeItem("loggedInUser");
  };

    const hideWhenVisible = { display: addBlogFormVisible ? "none" : "" };
    const showWhenVisible = { display: addBlogFormVisible ? "" : "none" };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <p>
          <Notification message={message} />
        </p>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <div style={hideWhenVisible}>
        <button onClick={() => setAddBlogFormVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <AddBlogForm
          setMessage={setMessage}
          setBlogs={setBlogs}
          blogs={blogs}
          setAddBlogFormVisible={setAddBlogFormVisible}
        />
      </div>
    </div>
  );
};

export default App;
