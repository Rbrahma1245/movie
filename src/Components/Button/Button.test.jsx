import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("ButtonRender", () => {
  let buttonText = "SUBMIT";

  let { getByText } = render(<Button innerText={buttonText} />);
  let buttonElement = getByText(buttonText)
  
  expect(buttonElement).toBeInTheDocument()
});


// test("", ()=>{

// })