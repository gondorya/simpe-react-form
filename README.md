# Getting Started with Simple React Forms

## How to run

Recommended Node 14 or higher

```javascript
npm install

npm start
```
## API

```javascript
<Form/>
```
A main component that manages the form state and its items

### Form props

**inputs**

Required. An array of inputs to be displayed in the form. Each input is an object with the following keys: name and label

```javascript
inputs: [{
    name: string, 
    label: string,
}]
```
---

**buttonText**

Optional. String displayed on submit button.

`buttonText: string`

---

**onSubmit**

Required. A function that takes input values as arguments

```javascript
onSubmit: (values: { [key: string]: string }) => void
```

---

**validation**

Optional. A function that takes input values as arguments and returns an object with inputs names and validation messages (if validation failed)

```javascript
validation: (values: { [x: string]: string; }) => ({ [key: string]: string })
```

It is recommended to use the methods from the prepared validation:

*validate*

It takes a value and all validating functions as attributes.

Each of the validating functions must take the input value as an attribute and return a message to be displayed if validation fails. Validate returns the message returned by the first validator that fails.

```javascript
validate: (value: string, ...validators: {(v: string): string}[]) => string
```

```javascript
validate("Jonathan", func1(), func2())
```

*is*

Takes as attributes validating function and string to be returned if validation fails. Returns a function that takes the value of the validated input as an argument.

```javascript
is: (predicate: (v: string) => boolean, message: string) => (value: string) => string
```

```javascript
is(
    notBlank(),
    "Field cannot be empty"
)("Input value")
```

Example usages with validate method:

```javascript
validate(
   firstName,
   is(notBlank(), "First Name field cannot be empty"),
   is(longerThan(3), "First Name must have more than 3 characters"),
   is(notLongerThan(10), "First Name can't have more than 10 characters")
)
```

Example usages in validation prop:

```javascript
    const inputs = [
        {
            name: "firstName",
            label: "First name "
        },
        {
            name: "lastName",
            label: "Last name "
        }
    ]
    const validation = (values) => {
        const {firstName, lastName} = values;
        return ({
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
        })
    }
    <Form validation={validation} inputs={inputs}/>
```

## Prepared validation functions

*notBlank*

checks if the value of input is not empty

```javascript
notBlank()("") // => false
notBlank()("       ") // => false
notBlank()("Message") // => true
```

*longerThan*

Takes number as an argument. 
Checks if the value is longer than this number.

```javascript
longerThan(3)("Jo") // => false
longerThan(3)("John") // => true
```

*notLongerThan*

Takes number as an argument.
Checks if the value is not longer than this number.

```javascript
notLongerThan(3)("Jo") // => true
notLongerThan(3)("John") // => false
```

*alphaNum*

Checks if text contains only letters and numbers

```javascript
alphaNum()("l0ng$ t3xt!") // => false
alphaNum()("longT3xt") // => true
```

*ascii*
Checks if text contains only American Standard Code

```javascript
ascii()("Poznań") // => false
ascii()("Poznan") // => true
```

*like*
Takes RegExp pattern as an argument.
Checks if the text matches this pattern

```javascript
like(/^[a-z0-9]+$/i)("text") // => true
like(/^[a-z0-9]+$/i)("text!") // => false
```

## Custom validation functions

You can also add your own validation function. This function should take the value of the validated input as an argument:
`(value: string) => boolean;`

For example, if you want a user's nickname to start with a company name ("acme.")

```javascript
    const customValidator = () => (value) => value.startsWith("acme.");

    const inputs = [
        {
            name: "nickname",
            label: "Nickname"
        },
    ]
    const validation = (values) => {
        const {nickname} = values;
        return ({
            nickname: validate(
                nickname,
                is(customValidator(), "Nickname must include 'acme.' prefix"),
            ),
        })
    }
    <Form validation={validation} inputs={inputs}/>
```

