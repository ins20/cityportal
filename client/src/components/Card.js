import React from 'react'
import { useContext } from 'react'
import { ApplicationContext } from '..'
import { applicationApi } from '../api/application'

const Card = ({ id, title, description, imageBefore, status, created_at, isProfile, category }) => {
    const { setApplications } = useContext(ApplicationContext)

    const handleDelete = async () => {
        await applicationApi.delete(id)
        const newApplications = await applicationApi.getAll()
        setApplications(newApplications)
    }
    return (
        <div className="card">
            <img src={imageBefore} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {isProfile && <p className="card-text">{description}</p>
                }
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{created_at}</li>
                <li className="list-group-item">{category}</li>
                {isProfile && <li className="list-group-item">{status}</li>}
            </ul>
            {isProfile &&
                <div className="card-body">
                    <button className='btn btn-primary' onClick={handleDelete}>Удалить</button>
                </div>
            }
        </div>
    )
}

export default Card