import React, { useState } from 'react'
import { CategoryContext } from '..'
import { useContext } from 'react'
const Form = ({ defaultValues, onSubmit, buttonSubmitValue }) => {
    const { categories } = useContext(CategoryContext)
    const [values, setValues] = useState(() => {
        return defaultValues.reduce((obj, field) => {
            return {
                ...obj,
                [field]: "",
            }
        }, {})
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'imageBefore') {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);

            reader.onload = () => {
                if (reader.result) {
                    setValues((prevFormData) => ({ ...prevFormData, [name]: reader.result }))
                }
            };
            reader.onerror = (error) => {
                console.log('Error: ', error);
            };
        } else {
            setValues((prevFormData) => ({ ...prevFormData, [name]: value }))

        }


    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        onSubmit(values)
    }


    return (
        <form className="col g-3 needs-validation" noValidate onSubmit={handleSubmit}>

            {Object.keys(values).map((key) => (

                <div key={key} >
                    {key === 'imageBefore' ?
                        <div className="mb-3">
                            <label htmlFor="imageBefore" className="form-label btn btn-primary">
                                Выберите картинку
                            </label>
                            <input onChange={(e) => handleChange(e)} className="form-control inputFile" type="file" id="imageBefore" name={key} />
                        </div> : key === 'categoryId' ?
                            <div className='mb-3'>
                                <label htmlFor="category" className="form-label" >{key}</label>
                                <select name={key} onChange={(e) => handleChange(e)} className="form-select" aria-label="Default select example" >
                                    <option selected hidden>Выберите категорию</option>
                                    {categories?.map((category) => (
                                        <option key={category.id} value={category.id}>{category.category}</option>
                                    ))}
                                </select>
                            </div> :
                            <div className="mb-3" >
                                <label htmlFor={key} className="form-label">{key}</label>
                                <input onChange={(e) => handleChange(e)} className="form-control" name={key} type="text" id={key} required />
                            </div>
                    }
                </div>
            ))}
            <div>
                <button className="btn btn-primary w-100" type="submit">{buttonSubmitValue}</button>
            </div>
        </form>
    )
}

export default Form