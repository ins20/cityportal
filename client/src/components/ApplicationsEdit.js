import React, { useState, useContext } from 'react'
import { applicationApi } from '../api/application'
import { ApplicationContext } from '..'

import Card from './Card'
const Applications = () => {
    const { applications } = useContext(ApplicationContext)

    return (
        <>
            <div className='d-none d-lg-block'>
                <table className="table-bordered table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Название</th>
                            <th scope="col">Описание</th>
                            <th scope="col">Статус</th>
                            <th scope="col">Фото до</th>
                            <th scope="col">Фото после</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {applications.map((application, index) => (
                            <Row {...application} index={index} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='d-lg-none d-block'>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {/* {applications?.map((item) => (
                        <div className="col"><Card {...item} isProfile={true} /></div>
                    ))} */}
                </div>
            </div>
        </>

    )
}

const Row = ({ status, imageBefore, imageAfter, description, title, index, id }) => {
    const [isEdit, setEdit] = useState(false)
    const [newImageAfter, setNewImageAfter] = useState(imageAfter)
    const [newStatus, setNewStatus] = useState()
    const { setApplications } = useContext(ApplicationContext)

    const handleUpdate = async () => {
        await applicationApi.update(id, { imageAfter: newImageAfter, status: newStatus })
        const newApplications = await applicationApi.getAll()
        setApplications(newApplications)
        setEdit(false)
    }


    const getBase64 = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            setNewImageAfter(reader.result)
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }
    return (
        <tr>
            <th scope="row" >{index + 1}</th>
            <td>
                {title}
            </td>
            <td >
                {description}
            </td>
            <td >
                {isEdit ? <>
                    <select onChange={(e) => setNewStatus(e.target.value)} className="form-select" aria-label="Default select example" >
                        <option selected hidden>Выберите статус</option>
                        <option>Решена</option>
                        <option>Отклонена</option>
                    </select>
                </> : status}
            </td>

            <td>
                <img className="img rounded mx-auto d-block" width={50} height={50} src={imageBefore} alt="" />
                <img className="imgOpen rounded mx-auto d-block" width={300} height={300} src={imageBefore} alt="" />
            </td>
            <td>

                {newImageAfter && <img className="img rounded mx-auto d-block" width={50} height={50} src={newImageAfter} alt="" />
                }
                <label htmlFor={`image${id}`} className={`form-label ${isEdit && "btn btn-primary"} w-100 text-center`}>
                    Выберите картинку
                </label>


                <input onChange={(e) => getBase64(e)} disabled={!isEdit} className="form-control inputFile" type="file" id={`image${id}`} name='image' />
            </td>
            <td>
                {isEdit ?
                    <>
                        <button className='btn btn-success w-50' onClick={handleUpdate}>Сохранить</button>
                        <button className='btn btn-warning w-50' onClick={() => setEdit(false)}>Отменить</button>

                    </>
                    : <button className='btn btn-primary w-100' onClick={() => setEdit(true)}>Изменить</button>
                }
            </td>
        </tr >
    )
}

export default Applications