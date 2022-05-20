import React from 'react';
import { render, screen } from '@testing-library/react';
import { waitFor, fireEvent  } from '@testing-library/dom';

import {Form} from "./Form";

const onSubmit = jest.fn();
const validation = jest.fn(() => ({}));
const setup = (props?: {}) => {
    const inputs = [
        {
            name: "username",
            label: "User name"
        },
        {
            name: "city",
            label: "City"
        },
        {
            name: "hobby",
            label: "Hobby"
        }
    ]


    return render(<Form inputs={inputs} onSubmit={onSubmit} validation={validation} {...props}/>)
}

test("renders inputs with labels", () => {
    setup();

    expect(screen.getByLabelText("User name")).toBeVisible();
    expect(screen.getByLabelText("City")).toBeVisible();
    expect(screen.getByLabelText("Hobby")).toBeVisible();
});

test("renders submit text on button as default", () => {
    setup();

    expect(screen.getByText("Submit")).toBeVisible();
});

test("renders custom text on button as default", () => {
    setup({buttonText: "Send"});

    expect(screen.getByText("Send")).toBeVisible();
});

test("calls validation function after click on submit button", async () => {
    const validation = jest.fn(() => ({}));
    setup({validation});

    await waitFor(() => {
        fireEvent.submit(screen.getByText("Submit"));
    });
    expect(validation).toHaveBeenCalledWith({city: "", hobby: "", username: ""})
});

test("calls onSubmit function after click on submit button", async () => {
    const validation = jest.fn(() => ({}));

    setup({validation});

    await waitFor(() => {
        fireEvent.submit(screen.getByText("Submit"));
    });
    expect(onSubmit).toHaveBeenCalledWith({city: "", hobby: "", username: ""})
});

test("does not call onSubmit function after click on submit button if validation returns some errors", async () => {
    const validation = jest.fn(() => ({city: "Too long"}));
    setup({
        validation
    });

    await waitFor(() => {
        fireEvent.submit(screen.getByText("Submit"));
    });
    expect(onSubmit).not.toHaveBeenCalled()
})