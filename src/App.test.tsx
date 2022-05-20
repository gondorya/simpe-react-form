import React from 'react';
import { render, screen } from '@testing-library/react';
import { waitFor, fireEvent  } from '@testing-library/dom';

import App from './App';

test("renders inputs with labels", () => {
  render(<App />);
  expect(screen.getByLabelText("Nickname")).toBeVisible();
  expect(screen.getByLabelText("First name")).toBeVisible();
  expect(screen.getByLabelText("Last name")).toBeVisible();
  expect(screen.getByLabelText("City")).toBeVisible();
});

test("doesn't render validation texts at default", () => {
  render(<App />);
  expect(screen.queryByText("Nickname must include 'acme.' prefix")).not.toBeInTheDocument();
  expect(screen.queryByText("First Name field cannot be empty")).not.toBeInTheDocument();
  expect(screen.queryByText("First Name must have more than 3 characters")).not.toBeInTheDocument();
  expect(screen.queryByText("First Name can't have more than 10 characters")).not.toBeInTheDocument();
  expect(screen.queryByText("Last Name can contain only numbers and letters")).not.toBeInTheDocument();
  expect(screen.queryByText("City can contain only American Standard Code characters")).not.toBeInTheDocument();
});

test("renders validation for nickname", async () => {
  render(<App />);

  await waitFor(() => {
    screen.getByText("Submit").click();
  })
  expect(screen.getByText("Nickname must include 'acme.' prefix")).toBeVisible();

  fireEvent.change(screen.getByLabelText(/Nickname/),
      {target: { value: "acme.nick" }});

  await waitFor(() => {
    screen.getByText("Submit").click();
  });

  expect(screen.queryByText("Nickname must include 'acme.' prefix")).not.toBeInTheDocument();
})

test("renders validation for first name", async () => {
  render(<App />);

  await waitFor(() => {
    screen.getByText("Submit").click();
  })
  expect(screen.getByText("First Name field cannot be empty")).toBeVisible();
  expect(screen.queryByText("First Name must have more than 3 characters")).not.toBeInTheDocument();
  expect(screen.queryByText("First Name can't have more than 10 characters")).not.toBeInTheDocument();


  fireEvent.change(screen.getByLabelText(/First name/),
      {target: { value: "Jo" }});

  await waitFor(() => {
    screen.getByText("Submit").click();
  });

  expect(screen.queryByText("First Name field cannot be empty")).not.toBeInTheDocument();
  expect(screen.getByText("First Name must have more than 3 characters")).toBeVisible();
  expect(screen.queryByText("First Name can't have more than 10 characters")).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/First name/),
      {target: { value: "Jonathan Louis" }});

  await waitFor(() => {
    screen.getByText("Submit").click();
  });

  expect(screen.queryByText("First Name field cannot be empty")).not.toBeInTheDocument();
  expect(screen.queryByText("First Name must have more than 3 characters")).not.toBeInTheDocument();
  expect(screen.getByText("First Name can't have more than 10 characters")).toBeVisible();
});

test("renders validation for last name", async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Last name/),
      {target: { value: "Smith-Doe" }});

  await waitFor(() => {
    screen.getByText("Submit").click();
  });

  expect(screen.getByText("Last Name can contain only numbers and letters")).toBeVisible();

  fireEvent.change(screen.getByLabelText(/Last name/),
      {target: { value: "Smith" }});

  await waitFor(() => {
    screen.getByText("Submit").click();
  });

  expect(screen.queryByText("Last Name can contain only numbers and letters")).not.toBeInTheDocument();
});


test("renders validation for city", async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/City/),
      {target: { value: "Ciudad Juárez" }});

  await waitFor(() => {
    screen.getByText("Submit").click();
  });

  expect(screen.getByText("City can contain only American Standard Code characters")).toBeVisible();

  fireEvent.change(screen.getByLabelText(/City/),
      {target: { value: "Ciudad Juarez" }});

  await waitFor(() => {
    screen.getByText("Submit").click();
  });

  expect(screen.queryByText("City can contain only American Standard Code characters")).not.toBeInTheDocument();
})
