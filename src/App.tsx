import React from 'react';
import './App.css';
import {Form, is, validate, notBlank, longerThan, notLongerThan, alphaNum, ascii} from "./Form"

function App() {
    const inputs = [
        {
            name: "nickname",
            label: "Nickname"
        },
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
    const customValidator = () => (value: string) => value.startsWith("acme.");

    const validation = ({nickname, firstName, lastName, city}: {nickname: string, firstName: string, lastName: string, city: string}) => ({
      nickname: validate(
          nickname,
          is(customValidator(), "Nickname must include 'acme.' prefix")
      ),
      firstName: validate(
          firstName,
          is(notBlank(), "First Name field cannot be empty"),
          is(longerThan(3), "First Name must have at least 3 characters"),
          is(notLongerThan(10), "First Name can't have more than 10 characters")
      ),
      lastName: validate(
          lastName,
          is(alphaNum(), "Last Name can contain only numbers and letters")
      ),
      city: validate(
            city,
            is(ascii(), "City can contain only American Standard Code characters")
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
