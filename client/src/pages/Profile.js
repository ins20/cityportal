import React from 'react'
import Form from '../components/Form'
import Card from '../components/Card'
import { applicationApi } from '../api/application'
import { useContext } from 'react'
import { ApplicationContext, AuthContext } from '..'

const Profile = () => {
    const { applications, setApplications } = useContext(ApplicationContext)
    const { currentUser } = useContext(AuthContext)
    const addApplication = async (values) => {
        values.userId = currentUser.id
        await applicationApi.create(values)
        const newApplications = await applicationApi.getAll()
        setApplications(newApplications)
    }
    return (
        <>
            <Form defaultValues={['title', 'description', 'imageBefore', 'categoryId']} onSubmit={addApplication} buttonSubmitValue={"Отправить"} />
            <div className='mb-3'>
                <label htmlFor="password" className="form-label" >Статус</label>
                <select className="form-select" aria-label="Default select example" >
                    <option value="1">Все</option>
                    <option value="2">Новая</option>
                    <option value="3">Отклонена</option>
                    <option value="4">Рассматривается</option>
                </select>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {applications?.map((item) => (
                    <div className="col"><Card {...item} isProfile={true} /></div>
                ))}
            </div>
        </>
    )
}

export default Profile