import React from 'react';
import './App.css';
import {Form} from "./Form"
import {is, validate, notBlank} from "./Form/validators";

function App() {
    const inputs = [
        {
            name: "firstName",
            label: "First name"
        },
        {
            name: "lastName",
            label: "Last name"
        },
        {
            name: "city",
            label: "City"
        }
    ]
    const onSubmit = (values: {}) => {
        console.log(values)
    }
    const validation = ({firstName}: {firstName: string}) => ({
      firstName: validate(
          firstName,
          is(notBlank, "First name field cannot be empty")
      )
    })
  return (
    <div className="container">
        <Form
            validation={validation}
            onSubmit={onSubmit}
            inputs={inputs}
        />
    </div>
  );
}

export default App;
