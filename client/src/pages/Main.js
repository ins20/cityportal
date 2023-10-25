import React, { useEffect, useState } from 'react'
import Form from "../components/Form"
import Card from '../components/Card'
import { useContext } from 'react'
import { ApplicationContext, AuthContext } from '..'
import { userApi } from '../api/user'
const Main = () => {
  const { setCurrentUser } = useContext(AuthContext)
  const { applications } = useContext(ApplicationContext)
  const register = async (values) => {
    const user = await userApi.register(values)
    if (user) {
      saveUser(user)
    }
  }
  const login = async (values) => {
    const user = await userApi.login(values)
    if (user) {
      saveUser(user)
    }
  }
  const saveUser = (user) => {
    setCurrentUser(user)
    localStorage.setItem('userId', user.id)
  }
  return (
    <>
      <div className="row justify-content-center align-items-center g-2">
        <div className="col">
          <div className="card">
            <div className='card-header'>
              Регистрация
            </div>
            <div className="card-body">
              <Form buttonSubmitValue="Зарегистрироваться" defaultValues={['fio', 'login', 'email', 'password', 'passwordConfirm', 'approval']} onSubmit={register} />
            </div>
          </div>

        </div>
        <div className="col">
          <div className="card">
            <div className='card-header'>
              Вход
            </div>
            <div className="card-body">
              <Form defaultValues={['login', 'password']} buttonSubmitValue={"Войти"} onSubmit={login} />
            </div>
          </div>
          <div className="card">
            <div className='card-header'>
              Счетчик решенных заявок
            </div>
            <div className='card-body'>
              0
            </div>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {applications?.map((item) => (
          <div className="col"><Card {...item} isProfile={true} /></div>
        ))}
      </div>
    </>
  )
}

export default Main