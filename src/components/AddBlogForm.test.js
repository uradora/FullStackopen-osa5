import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { prettyDOM } from "@testing-library/dom";
import AddBlogForm from "./AddBlogForm";

test("AddBlogForm updates calls handler function with the correct info on submit", () => {
  const addBlog = jest.fn();

  const component = render(<AddBlogForm addBlog={addBlog} />);

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector("#form");

  fireEvent.change(title, {
    target: { value: "Uuninpankkopoika" },
  });
  fireEvent.change(author, {
    target: { value: "Saku Timonen" },
  });
  fireEvent.change(url, {
    target: { value: "https://blogit.apu.fi/uuninpankkopoikasakutimonen/" },
  });
  fireEvent.submit(form);

  expect(addBlog.mock.calls.length).toBe(1);
  expect(addBlog.mock.calls[0][0].title).toBe("Uuninpankkopoika");
  expect(addBlog.mock.calls[0][0].author).toBe("Saku Timonen");
  expect(addBlog.mock.calls[0][0].url).toBe(
    "https://blogit.apu.fi/uuninpankkopoikasakutimonen/"
  );
});
