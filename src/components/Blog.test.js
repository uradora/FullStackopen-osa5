import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { fireEvent, prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

test("renders name and author", () => {
  const blog = {
    title: "Uuninpankkopoika",
    author: "Saku Timonen",
    url: "https://blogit.apu.fi/uuninpankkopoikasakutimonen/",
    likes: 9000,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("Uuninpankkopoika");
  expect(component.container).toHaveTextContent("Saku Timonen");
  expect(component.container).not.toHaveTextContent(
    "https://blogit.apu.fi/uuninpankkopoikasakutimonen/"
  );
  expect(component.container).not.toHaveTextContent("9000");

  console.log(prettyDOM(component.container));
});

test("renders name, author and url", () => {
  const blog = {
    title: "Uuninpankkopoika",
    author: "Saku Timonen",
    url: "https://blogit.apu.fi/uuninpankkopoikasakutimonen/",
    likes: 9000,
  };

  const component = render(<Blog blog={blog} />);

  const button = component.getByText("view")
  fireEvent.click(button)

  expect(component.container).toHaveTextContent("Uuninpankkopoika");
  expect(component.container).toHaveTextContent("Saku Timonen");
  expect(component.container).toHaveTextContent(
    "https://blogit.apu.fi/uuninpankkopoikasakutimonen/"
  );
  expect(component.container).toHaveTextContent("9000");

 console.log(prettyDOM(component.container))

});
