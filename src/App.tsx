import React from 'react';
import './App.css';
import {Form} from "./Form"

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
  return (
    <div className="App container">
        <Form
            inputs={inputs}
        />

    </div>
  );
}

export default App;
