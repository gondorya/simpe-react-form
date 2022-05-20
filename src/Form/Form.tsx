import React, {useState} from 'react';
import './Form.css';


interface InputProps {
    name: string,
    label: string,
}

interface InputsProps extends InputProps{
    value: string
}

interface FormProps {
    inputs: InputProps[]
    buttonText?: string,
    onSubmit: (values: { [key: string]: string }) => void,
    validation?: (values: { [x: string]: string; }) => ({ [key: string]: string })
}


interface InputsObject extends InputProps {
    value?: string
}

export const Form = ({inputs, buttonText = "Submit", onSubmit, validation}: FormProps) => {
    const inputsObject: {[key: string]: InputsProps} = {};
    const errorsObject: {[key: string]: string} = {};
    inputs.forEach((item: InputsObject) => {
        Object.assign(inputsObject, { [item.name]: {label: item.label, name: item.name, value: item.value || ""} });
        Object.assign(errorsObject, { [item.name]: ""})
    });

    const [formInputsData, setFormInputsData] = useState<{[x: string]: InputsProps}>(inputsObject);

    const [errors, setErrors] = useState(errorsObject)

    const submitHandler = (e: any) => {
        const valuesObject = Object.keys(formInputsData).reduce(
            (obj: {}, key: string) => Object.assign(obj, { [key]: formInputsData[key].value }), {})
        const validationResult = validation ? validation(valuesObject) : {};
        setErrors((prevState) => ({
            ...prevState,
            ...validationResult,
        }))
        if(Object.values(validationResult).every((field) => !field)) {
            return onSubmit(valuesObject)
        } else {
            e.preventDefault()
        }
    }

    const onChangeHandler = ({event: {target: {value}}, formInputName}: {event: {target: {value: string}}, formInputName: string}) => {
        setFormInputsData((prevState: {[key: string]: InputsProps }) => ({
            ...prevState,
            [formInputName]: {
                ...prevState[formInputName],
                value,
            }

        }))
    }

    return <form onSubmit={submitHandler}>
        <div className="form-content">
            {Object.keys(formInputsData).map((formInputName: string) =>
                (
                    <label key={formInputName} className="form-input-label">
                        <span>{formInputsData[formInputName].label}</span>
                        <input type="text" className="form-input" value={formInputsData[formInputName].value} name={formInputName} onChange={(event) => onChangeHandler({event, formInputName})}/>
                        {errors[formInputName] && <span className="form-input-error">{errors[formInputName]}</span>}
                    </label>

                )
             )}
        </div>

        <button type="submit">{buttonText}</button>
    </form>
}