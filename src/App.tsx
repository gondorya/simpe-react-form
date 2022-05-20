import React, {useState} from 'react';
import './App.css';
import {Form, is, validate, notBlank, longerThan, notLongerThan, alphaNum, ascii} from "./Form"

function App() {
    const [data, setData] = useState<{[x: string]: string}>({})
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
    const onSubmit = (values: { [x: string]: string; }) => {
        setData(values)
    }
    const customValidator = () => (value: string) => value.startsWith("acme.");

    const validation = (values: { [x: string]: string; }) => {
        const {nickname, firstName, lastName, city} = values;
        return ({
            nickname: validate(
                nickname,
                is(customValidator(), "Nickname must include 'acme.' prefix")
            ),
            firstName: validate(
                firstName,
                is(notBlank(), "First Name field cannot be empty"),
                is(longerThan(3), "First Name must have more than 3 characters"),
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
    }

  return (
    <div className="container">
        <div className="form-wrapper">
            <Form
                validation={validation}
                onSubmit={onSubmit}
                inputs={inputs}
            />
        </div>
        {
            Object.values(data).length ?  (
                <div className="result">
                    <div className="row">
                        <span className="title">Nickname: </span>
                        <span>{data.nickname}</span>
                    </div>
                    <div className="row">
                        <span className="title">First Name: </span>
                        <span>{data.firstName}</span>
                    </div>
                    <div className="row">
                        <span className="title">Last Name: </span>
                        <span>{data.lastName}</span>
                    </div>
                    <div className="row">
                        <span className="title">City: </span>
                        <span>{data.city}</span>
                    </div>
                </div>
            ) : null
        }
    </div>
  );
}

export default App;
