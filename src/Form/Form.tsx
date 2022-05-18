import React, {useState} from 'react';
import './Form.css';

interface InputsProps {
    name: string,
    label: string,
    value?: string
}

interface FormProps {
    inputs: InputsProps[]
    buttonText?: string,
}

export const Form = ({inputs, buttonText = "Submit"}: FormProps) => {
    const inputsObject = inputs.reduce(
        (obj: {}, item: InputsProps) => Object.assign(obj, { [item.name]: {label: item.label, name: item.name, value: item.value} }), {});

    const [formInputsData, setFormInputsData] = useState<{[x: string]: InputsProps}>(inputsObject);

    return <form>
        <div className="form-content">
            {Object.keys(formInputsData).map((formInputName: string) =>
                (
                    <label key={formInputName} className="form-input-label">
                        <span>{formInputsData[formInputName].label}</span>
                        <input type="text" className="form-input" value={formInputsData[formInputName].value} name={formInputName} onChange={({target: {value}}) => setFormInputsData((prevState: {[p: string]: InputsProps }) => ({
                            ...prevState,
                            [formInputName]: {
                                ...prevState[formInputName],
                                value,
                            }

                        }))}/>
                    </label>

                )
             )}
        </div>

        <button>{buttonText}</button>
    </form>
}