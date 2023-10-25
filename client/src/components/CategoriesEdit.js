import React, { useContext, useState } from 'react'
import { categoryApi } from '../api/category'
import { CategoryContext,ApplicationContext } from '..'
import { applicationApi } from '../api/application'

const Categories = () => {
    const { categories, setCategories } = useContext(CategoryContext)
    const { setApplications } = useContext(ApplicationContext)
    const [category, setCategory] = useState()
    const addCategory = async () => {
        await categoryApi.create({ category: category })
        const newCategories = await categoryApi.getAll()
        setCategories(newCategories)
    }
    const deleteCategory = async (id) => {
        await categoryApi.delete(id)
        const newCategories = await categoryApi.getAll()
        const newApplications = await applicationApi.getAll()
        setApplications(newApplications)
        setCategories(newCategories)
    }
    return (
        <table className="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th> </th>
                    <th>Категория</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody className='table-group-divider'>
                <tr>
                    <th scope="row"></th>
                    <td >
                        <input onChange={(e) => setCategory(e.target.value)} type="text" className="form-control" placeholder="Категория" aria-label="category" aria-describedby="basic-addon1" />
                    </td>
                    <td >

                        <button className='btn btn-primary w-100' onClick={addCategory}>Добавить</button>
                    </td>
                </tr>
                {categories?.map((category, index) => (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td >{category.category}</td>
                        <td > <button className='btn btn-primary w-100' onClick={() => deleteCategory(category.id)}>Удалить</button></td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}

export default Categories